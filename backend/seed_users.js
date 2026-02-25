import axios from 'axios';

const createAdmin = async () => {
    try {
        const adminUser = {
            name: "Super Admin",
            email: "admin@university.edu",
            password: "admin123",
            role: "ADMIN",
            department: "Administration"
        };

        const response = await axios.post('http://localhost:5000/api/auth/register', adminUser);
        console.log('Admin User Created Successfully!');
        console.log('Email:', response.data.email);
        console.log('Role:', response.data.role);
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.message);
        } else {
            console.error('Error:', error.message);
        }
    }
};

const createFaculty = async () => {
    try {
        const facultyUser = {
            name: "Dr. Sarah Wilson",
            email: "faculty@university.edu",
            password: "faculty123",
            role: "FACULTY",
            department: "Computer Science",
            designation: "Professor"
        };

        const response = await axios.post('http://localhost:5000/api/auth/register', facultyUser);
        console.log('Faculty User Created Successfully!');
        console.log('Email:', response.data.email);
        console.log('Role:', response.data.role);
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.message);
        } else {
            console.error('Error:', error.message);
        }
    }
}

const main = async () => {
    console.log("Seeding Database with Admin and Faculty...");
    await createAdmin();
    await createFaculty();
};

main();
