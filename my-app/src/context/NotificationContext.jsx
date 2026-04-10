import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user) {
            const newSocket = io('https://prefinal-year-project.onrender.com');
            setSocket(newSocket);

            newSocket.emit('join', user._id);

            newSocket.on('notification', (notification) => {
                setNotifications(prev => [notification, ...prev]);
                setUnreadCount(prev => prev + 1);
                toast.success(`New Notification: ${notification.title}`, {
                    icon: '🔔',
                    duration: 4000
                });
            });

            fetchNotifications();

            return () => newSocket.close();
        }
    }, [user]);

    const fetchNotifications = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get('https://prefinal-year-project.onrender.com/api/notifications', config);
            setNotifications(data);
            const unread = data.filter(n => {
                const recipient = n.recipients.find(r => r.user === user._id);
                return recipient ? !recipient.isRead : true;
            }).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(`https://prefinal-year-project.onrender.com/api/notifications/${notificationId}/read`, {}, config);

            setNotifications(prev => prev.map(n =>
                n._id === notificationId ? { ...n, recipients: n.recipients.map(r => r.user === user._id ? { ...r, isRead: true } : r) } : n
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
