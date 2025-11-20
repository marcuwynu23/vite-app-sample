pipeline {
    agent any
    tools {
        nodejs "NodeJS 20" // must match the name in Global Tool Config
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:wesdevteam/vite-app-sample.git', credentialsId: 'your-ssh-key-id'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
