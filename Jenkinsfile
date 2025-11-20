pipeline {
     agent {
        docker {
            image 'appdynamics/nodejs-agent:latest'
        }
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
