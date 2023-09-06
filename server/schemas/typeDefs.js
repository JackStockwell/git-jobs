const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        jobSaves: [Job]
        jobApp: [Job]
    }

    type Job {
        _id: ID!
        title: String!
        location: String!
        salary: Float
        description: String!
    }

    type Category {
        name: String!
    }

    type Query {
        users: User
        jobs: Job
    }

`;

module.exports = typeDefs;