const http = require('http');
const dbConnection = require('./demo_db_connection')
const uuid = require('uuid')
const users = [
    {
        fName: "Rahul",
        mName: "Kumar",
        lName: "Sharma",
        email: "rahul.sharma@example.com",
        password: "Rahul@123",
        rePassword: "Rahul@123",
        dob: "1998-05-14",
        hobby: ["Cricket", "Reading", "Traveling"],
        gender: "Male",
        address: "Ahmedabad, Gujarat, India",
        role: "User"
    },
    {
        fName: "Priya",
        mName: "Anil",
        lName: "Patel",
        email: "priya.patel@example.com",
        password: "Priya@123",
        rePassword: "Priya@123",
        dob: "1999-08-21",
        hobby: ["Cooking", "Music", "Dancing"],
        gender: "Female",
        address: "Surat, Gujarat, India",
        role: "Admin"
    },
    {
        fName: "Amit",
        mName: "Rajesh",
        lName: "Verma",
        email: "amit.verma@example.com",
        password: "Amit@123",
        rePassword: "Amit@123",
        dob: "1997-11-10",
        hobby: ["Gaming", "Coding", "Football"],
        gender: "Male",
        address: "Mumbai, Maharashtra, India",
        role: "User"
    },
    {
        fName: "Sneha",
        mName: "Mahesh",
        lName: "Joshi",
        email: "sneha.joshi@example.com",
        password: "Sneha@123",
        rePassword: "Sneha@123",
        dob: "2000-03-18",
        hobby: ["Yoga", "Painting", "Reading"],
        gender: "Female",
        address: "Pune, Maharashtra, India",
        role: "Admin"
    },
    {
        fName: "Karan",
        mName: "Suresh",
        lName: "Mehta",
        email: "karan.mehta@example.com",
        password: "Karan@123",
        rePassword: "Karan@123",
        dob: "1996-06-25",
        hobby: ["Photography", "Cycling", "Traveling"],
        gender: "Male",
        address: "Delhi, India",
        role: "User"
    },
    {
        fName: "Neha",
        mName: "Rakesh",
        lName: "Singh",
        email: "neha.singh@example.com",
        password: "Neha@123",
        rePassword: "Neha@123",
        dob: "2001-01-12",
        hobby: ["Singing", "Shopping", "Movies"],
        gender: "Female",
        address: "Jaipur, Rajasthan, India",
        role: "Admin"
    }
];
const server = http.createServer(async (req, res) => {

    const setCorsHeaders = () => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    };

    setCorsHeaders();

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const db = await dbConnection.connect()
    console.log(req.url)
    if (req.url === '/registration' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const data = JSON.parse(body);

            const existingUser = users.find(
                u => u.email === data.email
            );

            if (existingUser) {

                res.writeHead(401, {
                    'Content-Type': 'application/json'
                });

                return res.end(JSON.stringify({
                    message: 'Email Already Exists'
                }));
            }

            users.push({
                fName: data.fName,
                mName: data.mName,
                lName: data.lName,
                email: data.email,
                password: data.password,
                rePassword: data.rePassword,
                dob: data.dob,
                hobby: data.hobby,
                gender: data.gender,
                address: data.address,
                role: data.role
            });

            const newUser = await db.query(
                `INSERT INTO users(id,fName,mName,lName,email,password,rePassword,dob,hobby,gender,address,role)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [uuid.v4(), data.fName, data.mName, data.lName, data.email, data.password, data.rePassword, data.dob, JSON.stringify(data.hobby), data.gender, data.address, data.role]);
            console.log('newUser', newUser)
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'User Registered',
                data
            }));
        });

        req.on('error', err => {
            console.error('Request error:', err);
            res.writeHead(400);
            res.end();
        });

        return;
    }

    else if (req.url === '/login' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {

            const data = JSON.parse(body);

            const [users] = await db.query(
                `SELECT * FROM users
             WHERE email = ? AND password = ?`,
                [data.email, data.password]
            );

            if (users.length > 0) {

                const user = users[0];

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Login Success',
                    user
                }));

            } else {

                res.writeHead(401, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Invalid Email & Password'
                }));
            }

        });
    }

    else if (req.url === '/edituser' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            const data = JSON.parse(body);

            const existingUser = users.find(
                u => u.email === data.email
            );

            if (existingUser) {

                existingUser.fName = data.fName || existingUser.fName;
                existingUser.mName = data.mName || existingUser.mName;
                existingUser.lName = data.lName || existingUser.lName;
                existingUser.password = data.password || existingUser.password;
                existingUser.rePassword = data.rePassword || existingUser.rePassword;
                existingUser.dob = data.dob || existingUser.dob;
                existingUser.hobby = data.hobby || existingUser.hobby;
                existingUser.gender = data.gender || existingUser.gender;
                existingUser.address = data.address || existingUser.address;
                existingUser.role = data.role || existingUser.role;

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'User Detail Changed',
                    user: existingUser
                }));

            } else {

                res.writeHead(404, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'User Not Found'
                }));
            }
        });
    }
    else if (req.url === '/dashboard' && req.method === 'GET') {
        const [userList] = await db.query("select * from users")
        console.log('req', req.headers.referer)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Dashboard Data',
            totalUsers: userList.length,
            userList
        }));
    }
    else {
        res.writeHead(404)
        res.end()
    }
})



server.listen(3000).on('listening', () => {
    console.log('Server Started on 3000 port')
})