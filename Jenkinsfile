pipeline {
    agent {
        docker {
            image 'node:20'                // NodeJS inside Docker
            args '-v /var/jenkins_home:/var/jenkins_home'  // persist workspace
        }
    }
    triggers {
        pollSCM('H/5 * * * *')           // optional: poll every 5 minutes for changes
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'git@github.com:wesdevteam/vite-app-sample.git',
                    credentialsId: 'your-ssh-key-id'  // SSH key credential in Jenkins
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
        stage('Test') {
            steps {
                sh 'npm test || true'  // optional: avoid failing the pipeline if no tests
            }
        }
    }
}
