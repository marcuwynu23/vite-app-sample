pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Use the SSH key credential
                sshagent(['ssh-server-key']) {
                    git branch: 'main', url: 'git@github.com:wesdevteam/vite-app-sample.git'
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
