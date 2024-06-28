pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Server') {
            steps {
                sh 'node server.js'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    mail to: 'jean.auma@student.moringaschool.com',
                    subject: 'failed tests',
                    body: 'The build for the test failed. Check your Jenkins console for details on the fail, thank you.'
                }
            }
        }
    }
}