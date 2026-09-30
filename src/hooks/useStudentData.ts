/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../context/AuthContext';

export interface UserEnrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  priceBDT: number;
  status: 'active' | 'completed' | 'pending';
  createdAt?: any;
}

export interface UserMentorBooking {
  id: string;
  mentorId: string;
  mentorName: string;
  studentName: string;
  email: string;
  preferredDate: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt?: any;
}

export interface UserWorkshopRegistration {
  id: string;
  workshopId: string;
  workshopTitle: string;
  email: string;
  createdAt?: any;
}

export interface UserSavedRoadmap {
  id: string;
  background: string;
  goal: string;
  commitment: string;
  title: string;
  createdAt?: any;
}

export function useStudentData() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<UserEnrollment[]>([]);
  const [mentorBookings, setMentorBookings] = useState<UserMentorBooking[]>([]);
  const [workshops, setWorkshops] = useState<UserWorkshopRegistration[]>([]);
  const [savedRoadmaps, setSavedRoadmaps] = useState<UserSavedRoadmap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setEnrollments([]);
      setMentorBookings([]);
      setWorkshops([]);
      setSavedRoadmaps([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // 1. Enrollments listener
    const enrollmentsPath = 'enrollments';
    const enrollmentsQuery = query(
      collection(db, enrollmentsPath),
      where('userId', '==', user.uid)
    );
    const unsubEnrollments = onSnapshot(
      enrollmentsQuery,
      (snapshot) => {
        const list: UserEnrollment[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...(doc.data() as Omit<UserEnrollment, 'id'>) });
        });
        setEnrollments(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, enrollmentsPath);
      }
    );

    // 2. Mentor Bookings listener
    const mentorPath = 'mentor_bookings';
    const mentorQuery = query(
      collection(db, mentorPath),
      where('userId', '==', user.uid)
    );
    const unsubMentors = onSnapshot(
      mentorQuery,
      (snapshot) => {
        const list: UserMentorBooking[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...(doc.data() as Omit<UserMentorBooking, 'id'>) });
        });
        setMentorBookings(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, mentorPath);
      }
    );

    // 3. Workshop Registrations listener
    const workshopPath = 'workshop_registrations';
    const workshopQuery = query(
      collection(db, workshopPath),
      where('userId', '==', user.uid)
    );
    const unsubWorkshops = onSnapshot(
      workshopQuery,
      (snapshot) => {
        const list: UserWorkshopRegistration[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...(doc.data() as Omit<UserWorkshopRegistration, 'id'>) });
        });
        setWorkshops(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, workshopPath);
      }
    );

    // 4. Saved Roadmaps listener
    const roadmapPath = 'saved_roadmaps';
    const roadmapQuery = query(
      collection(db, roadmapPath),
      where('userId', '==', user.uid)
    );
    const unsubRoadmaps = onSnapshot(
      roadmapQuery,
      (snapshot) => {
        const list: UserSavedRoadmap[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...(doc.data() as Omit<UserSavedRoadmap, 'id'>) });
        });
        setSavedRoadmaps(list);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, roadmapPath);
      }
    );

    return () => {
      unsubEnrollments();
      unsubMentors();
      unsubWorkshops();
      unsubRoadmaps();
    };
  }, [user]);

  return {
    enrollments,
    mentorBookings,
    workshops,
    savedRoadmaps,
    loading,
  };
}
