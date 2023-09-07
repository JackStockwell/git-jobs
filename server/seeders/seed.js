const connection = require('../config/connection');
const { User, Job, Category } = require('../models')
const {
    getRandomTitle,
    getRandomCompany,
    getRandomCategory
} = require('./data/jobs')

// Data
const categorySeeds = require('./data/category.json')

connection.once('open', async () => {
    
    let categoryCheck = await connection.db.listCollections({name: 'categories'}).toArray();
    if (categoryCheck.length) {
        console.log('Categories collection detected, dropping categories...')
        await Category.deleteMany({})
    }

    let jobsCheck = await connection.db.listCollections({name: 'jobs'}).toArray();
    if (jobsCheck.length) {
        console.log('Jobs collection detected, dropping jobs...')
        await Job.deleteMany({})
    }

    await Category.create(categorySeeds)

    let jobsArr = []

    for (let i = 0;i < 3; i++) {

        let newJob = {
            title: getRandomTitle(),
            company: getRandomCompany(),
            salary: Math.floor(Math.random() * (60 - 24 + 1)) + 24,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis non reprehenderit blanditiis assumenda officiis numquam sapiente nemo id, soluta facilis molestiae iure tempore, magni quo, repudiandae pariatur cum.",
            category: [getRandomCategory()]
        }

        jobsArr.push(newJob)
    }

    await Job.create(jobsArr)


    console.log(jobsArr)
    
    console.log('Seeding Complete 🌱')
    process.exit(0)
})