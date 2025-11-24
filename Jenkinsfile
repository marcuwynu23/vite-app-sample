pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Use SSH key directly
                sh '''
                    export HOME=/var/jenkins_home
                    rm -rf * .git
                    git clone -b main git@github.com:wesdevteam/vite-app-sample.git .
                '''
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
