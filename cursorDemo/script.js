document.addEventListener('DOMContentLoaded', function() {
    const chatHistory = document.querySelector('.chat-history');
    const userInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // 保存到 localStorage
        saveToLocalStorage();
    }

    function saveToLocalStorage() {
        localStorage.setItem('chatHistory', chatHistory.innerHTML);
    }

    function loadFromLocalStorage() {
        const savedChat = localStorage.getItem('chatHistory');
        if (savedChat) {
            chatHistory.innerHTML = savedChat;
        }
    }

    // 在页面加载时恢复对话
    loadFromLocalStorage();

    function getAIResponse(message) {
        // 这里是简单的模拟 AI 响应
        const responses = [
            "我明白了，请继续。",
            "这是一个有趣的观点。",
            "你能详细解释一下吗？",
            "我需要更多信息来回答这个问题。",
            "这确实是一个复杂的话题。"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';

            // 模拟 AI 响应
            setTimeout(() => {
                const aiResponse = getAIResponse(message);
                addMessage('ai', aiResponse);
            }, 1000);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function saveConversation() {
        const conversations = Array.from(chatHistory.children).map(msg => {
            const sender = msg.classList.contains('user') ? '用户' : 'AI';
            return `${sender}: ${msg.textContent}`;
        }).join('\n');

        const blob = new Blob([conversations], {type: "text/plain"});
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "conversation.txt";
        a.click();
    }

    // 添加保存按钮
    const saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', saveConversation);
    document.querySelector('.chat-interface').appendChild(saveButton);

    const copyButton = document.getElementById('copy-conversation');
    const conversationText = document.getElementById('conversation-text');

    copyButton.addEventListener('click', function() {
        // 获取整个对话历史
        const conversations = Array.from(chatHistory.children).map(msg => {
            const sender = msg.classList.contains('user') ? '用户' : 'AI';
            return `${sender}: ${msg.textContent}`;
        }).join('\n');

        // 将对话内容放入隐藏的文本区域
        conversationText.value = conversations;
        conversationText.style.display = 'block';
        conversationText.select();
        document.execCommand('copy');
        conversationText.style.display = 'none';

        alert('对话内容已复制到剪贴板');
    });

    // 轮播图实现
    const carouselImages = [
        { src: 'pictures/image1.png', title: 'cursor锐评1' },
        { src: 'pictures/image2.png', title: 'cursor锐评2' },
        { src: 'pictures/image3.png', title: 'cursor锐评3' },
        { src: 'pictures/image4.png', title: 'cursor锐评4' }
    ];

    function createCarousel() {
        const carousel = document.querySelector('.carousel-inner');
        carouselImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;
            carousel.appendChild(img);
        });
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', function() {
        createCarousel();
    });
});