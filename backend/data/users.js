import bcrypt from 'bcryptjs'

const users = [
    {
        name: "DeGREAT Asas",
        email: "admin@email.io",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "Angelina Cheah",
        email: "angel@email.io",
        password: bcrypt.hashSync('54321', 10),
        isAdmin: false
    },
    {
        name: "James K. Brown",
        email: "jkbrown@email.io",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: "Emmanuel Asamoah",
        email: "easas@email.io",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: "Elizabeth Serwah Denkyi",
        email: "seadamor@gmail.io",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
]

export default users;