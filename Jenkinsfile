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
                callname('Chento')
                echo '==============build version=============-'
                sh 'yes | docker system prune -a'
                sh 'docker-compose up -d --build'
                sh "curl -s -X POST https://api.telegram.org/bot6811807545:AAGl9wT-cF8niS_JsvqupVcctSliKqoYI4g/sendMessage -d chat_id=-4138686370 -d text='url deploy : http://35.185.181.230:8083/ '"
            }
        }
    }

}
