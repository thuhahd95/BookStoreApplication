pipeline {
    agent any

    // Định nghĩa biến môi trường nếu cần (ví dụ: tắt màu log hoặc cấu hình CI)
    environment {
        CI = 'true'
    }
    tools {
        // Khai báo tên công cụ Node.js đã được cấu hình trong Jenkins Global Tool Configuration
        nodejs 'NodeJS-26.13.0' 
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                // Checkout mã nguồn từ Git repository của bạn
                checkout scm
            }
        }

        stage('2. Install Dependencies') {
            steps {
                // Cài đặt các npm packages
                sh 'npm ci'
            }
        }

        stage('3. Install Playwright Browsers') {
            steps {
                // Cài đặt các binary của trình duyệt Playwright (nếu chưa có trên agent)
                sh 'npx playwright install --with-deps'
            }
        }

        stage('4. Run Playwright Tests') {
            steps {
                // Chạy lệnh test TypeScript/Playwright đã khai báo trong package.json
                sh 'npm run test:Validation' // Chạy các test có tag @ValidationCase
            }
        }
    }

    post {
        // Tự động lưu trữ báo cáo test (HTML Report) sau khi chạy xong
        always {
            // Xuất Playwright HTML Report
            publishHTML([
                allowMissing: false,          // Báo lỗi nếu không tìm thấy thư mục report (để dễ debug nếu test crash)
                alwaysLinkToLastBuild: true,  // Luôn hiển thị link ở bản dựng mới nhất
                keepAll: true,                // Giữ lại báo cáo của mọi lần build (hoặc false nếu chỉ muốn lưu bản mới nhất)
                reportDir: 'playwright-report', // Thư mục sinh ra báo cáo của Playwright
                reportFiles: 'index.html',    // File chạy chính của báo cáo
                reportName: 'Playwright HTML Report', // Tên hiển thị trên menu Jenkins
                reportTitles: ''
            ])
        }
        
        failure {
            echo '❌ Pipeline thất bại! Vui lòng kiểm tra lại Playwright Report.'
        }
        
        success {
            echo '✅ Pipeline hoàn thành thành công!'
        }
    }
}