pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Clean workspace completely and use SSH credentials
                deleteDir() // removes everything, including hidden files
                sshagent(['ssh-server-key']) { // SSH key credential configured in Jenkins
                    sh 'git clone -b main git@github.com:wesdevteam/vite-app-sample.git .'
                }
            }
        }

        stage('List Workspace') {
            steps {
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
