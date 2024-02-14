library identifier : 'boilerplate-library@main', retriever: modernSCM(
    [
        $class:'GitSCMSource',
        remote: 'https://github.com/chento007/boilerplate-library.git',
        credentialsId:''
    ]
)
pipeline {
    agent any

    tools {
        nodejs 'node-16.18.1'
    }

    stages {
        stage('Build Image') {
            steps {
                callname("Chento")
                echo '==============build version============='
                sh 'yes | docker system prune -a'
                sh 'docker-compose up -d --build'
            }
        }
    }
}
