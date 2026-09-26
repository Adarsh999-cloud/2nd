const defaultBots = [
    { id: 'bot-1', name: 'Talko AI Bot', status: 'Online', avatar: '🤖', isBot: true },
    { id: 'bot-2', name: 'Support Assistant', status: 'Online', avatar: '💬', isBot: true },
    { id: 'bot-3', name: 'Code Helper', status: 'Online', avatar: '💻', isBot: true },
    { id: 'bot-4', name: 'Design Assistant', status: 'Online', avatar: '🎨', isBot: true },
    { id: 'bot-5', name: 'Fitness Coach', status: 'Online', avatar: '🏋️', isBot: true },
    { id: 'bot-6', name: 'Music Advisor', status: 'Online', avatar: '🎵', isBot: true },
    { id: 'bot-7', name: 'Gaming Buddy', status: 'Online', avatar: '🎮', isBot: true },
    { id: 'bot-8', name: 'Chef Bot', status: 'Online', avatar: '🍳', isBot: true },
    { id: 'bot-9', name: 'Travel Guide', status: 'Online', avatar: '✈️', isBot: true },
    { id: 'bot-10', name: 'Study Buddy', status: 'Online', avatar: '📚', isBot: true },
    { id: 'bot-11', name: 'Finance Bot', status: 'Online', avatar: '💰', isBot: true },
    { id: 'bot-12', name: 'Movie Master', status: 'Online', avatar: '🍿', isBot: true },
    { id: 'bot-13', name: 'Math Solver', status: 'Online', avatar: '📐', isBot: true },
    { id: 'bot-14', name: 'Tech News Bot', status: 'Online', avatar: '📰', isBot: true },
    { id: 'bot-15', name: 'Language Tutor', status: 'Online', avatar: '🌐', isBot: true },
    { id: 'bot-16', name: 'Motivational Coach', status: 'Online', avatar: '🔥', isBot: true },
    { id: 'bot-17', name: 'Weather Bot', status: 'Online', avatar: '🌤️', isBot: true },
    { id: 'bot-18', name: 'Health Guide', status: 'Online', avatar: '❤️', isBot: true },
    { id: 'bot-19', name: 'Trivia Master', status: 'Online', avatar: '🧩', isBot: true },
    { id: 'bot-20', name: 'Auto Assistant', status: 'Online', avatar: '🚗', isBot: true }
];

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SESSION & USER CHECK ---
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.replace('login.html');
        return;
    }

    const currentUserId = currentUser.username || currentUser.phone;
    let activeChatId = null;

    // DOM Element References
    const currentNameEl = document.getElementById('currentUserName');
    const myAvatarEl = document.getElementById('myAvatar');
    const activeNameEl = document.getElementById('activeChatName');
    const activeStatusEl = document.getElementById('activeChatStatus');
    const activeChatAvatarEl = document.getElementById('activeChatAvatar');
    const userProfileBtn = document.getElementById('userProfileBtn') || document.getElementById('myAvatar');
    const profileDropdown = document.getElementById('profileDropdown');
    const voiceCallBtn = document.getElementById('voiceCallBtn');
    const videoCallBtn = document.getElementById('videoCallBtn');

    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

// EEE CODE 'DOMContentLoaded'-NTE ULLIL PASTE CHEYYUKA

// --- STATUS TAB & NAVIGATION TOGGLE ---
    const navChatsBtn = document.getElementById('navChatsBtn');
    const navStatusBtn = document.getElementById('navStatusBtn');
    const chatListContainer = document.getElementById('chatListContainer') || document.getElementById('chatList');
    const statusGridContainer = document.getElementById('statusGridContainer');

    if (navStatusBtn && statusGridContainer) {
        navStatusBtn.addEventListener('click', () => {
            if (navChatsBtn) navChatsBtn.classList.remove('active');
            navStatusBtn.classList.add('active');

            if (chatListContainer) chatListContainer.style.display = 'none';
            statusGridContainer.style.display = 'block';
            statusGridContainer.classList.remove('hidden');
        });
    }

    if (navChatsBtn && chatListContainer) {
        navChatsBtn.addEventListener('click', () => {
            if (navStatusBtn) navStatusBtn.classList.remove('active');
            navChatsBtn.classList.add('active');

            if (statusGridContainer) {
                statusGridContainer.style.display = 'none';
                statusGridContainer.classList.add('hidden');
            }
            chatListContainer.style.display = 'block';
        });
    }
    


    // Status Tab Click cheyyumbol Status Grid Varum

    // --- THEME INITIALIZATION ---
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (toggleSwitch) {
            toggleSwitch.checked = (currentTheme === 'light-mode');
        }
    } else {
        document.body.classList.add('dark-mode');
        if (toggleSwitch) {
            toggleSwitch.checked = false;
        }
    }

    // Ripple Theme Switcher Function
    function switchTheme(e) {
        const ripple = document.createElement('div');
        ripple.className = 'theme-ripple';

        const rect = e.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        if (e.target.checked) {
            ripple.style.backgroundColor = '#f7f4ef';
            document.body.appendChild(ripple);

            setTimeout(() => {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
            }, 150);
        } else {
            ripple.style.backgroundColor = '#0a0a0f';
            document.body.appendChild(ripple);

            setTimeout(() => {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            }, 150);
        }

        requestAnimationFrame(() => {
            ripple.classList.add('active');
        });

        setTimeout(() => {
            ripple.remove();
        }, 900);
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme);
    }

    // Call Buttons
    if (voiceCallBtn) {
        voiceCallBtn.addEventListener('click', () => {
            if (!activeChatId) return alert('Please select a chat first!');
            alert('This is a demo frontend website. Voice Call feature is currently not supported!');
        });
    }

    if (videoCallBtn) {
        videoCallBtn.addEventListener('click', () => {
            if (!activeChatId) return alert('Please select a chat first!');
            alert('This is a demo frontend website. Video Call feature is currently not supported!');
        });
    }

    // --- HELPER FUNCTIONS ---
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function getContactsList() {
        let talkoUsers = JSON.parse(localStorage.getItem('talkoUsers')) || [];
        const defaultContacts = [
            { id: '1', name: 'Talko AI Bot 🤖', status: 'Online', avatar: '🤖' },
            { id: '2', name: 'Rahul V', status: 'Online', avatar: 'R' },
            { id: '3', name: 'Ananya S', status: 'Offline', avatar: 'A' }
        ];

        let list = talkoUsers.length > 0 
            ? talkoUsers.filter(u => String(u.username || u.phone) !== String(currentUserId))
            : defaultContacts;

        return list.map((c, idx) => {
            if (!c.status) {
                c.status = (idx % 2 === 0) ? 'Online' : 'Offline';
            }
            return c;
        });
    }

    function loadProfileUI() {
        const userName = currentUser.name || currentUser.username || 'User';
        if (currentNameEl) currentNameEl.textContent = userName;

        if (myAvatarEl) {
            if (currentUser.avatarImg) {
                myAvatarEl.innerHTML = `<img src="${currentUser.avatarImg}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
            } else {
                myAvatarEl.textContent = currentUser.avatar || (userName ? userName.charAt(0).toUpperCase() : 'U');
            }
        }
    }
    loadProfileUI();

    // --- 2. PROFILE DROPDOWN LOGIC ---
    if (userProfileBtn && profileDropdown) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
            profileDropdown.classList.add('hidden');
        });
    }

    // Change Name Option
    const optChangeName = document.getElementById('optChangeName');
    if (optChangeName) {
        optChangeName.addEventListener('click', () => {
            const currentDisplayName = currentUser.name || currentUser.username || '';
            const newName = prompt('Enter your new name:', currentDisplayName);
            
            if (newName && newName.trim() !== '') {
                const updatedName = newName.trim();

                currentUser.name = updatedName;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                let users = JSON.parse(localStorage.getItem('talkoUsers')) || [];
                const userIndex = users.findIndex(u => 
                    String(u.username) === String(currentUserId) || 
                    String(u.phone) === String(currentUserId)
                );

                if (userIndex !== -1) {
                    users[userIndex].name = updatedName;
                    localStorage.setItem('talkoUsers', JSON.stringify(users));
                }

                loadProfileUI();
                renderContacts();
                alert('Name updated successfully!');
            }
        });
    }

    // Change Profile Picture Option
    const optChangePic = document.getElementById('optChangePic');
    if (optChangePic) {
        optChangePic.addEventListener('click', () => {
            const picInput = document.createElement('input');
            picInput.type = 'file';
            picInput.accept = 'image/*';
            picInput.click();

            picInput.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (file.size > 1.5 * 1024 * 1024) {
                    alert('File size too large. Please select an image under 1.5MB.');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(evt) {
                    const avatarBase64 = evt.target.result;

                    try {
                        currentUser.avatarImg = avatarBase64;
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));

                        let users = JSON.parse(localStorage.getItem('talkoUsers')) || [];
                        const userIndex = users.findIndex(u => 
                            String(u.username) === String(currentUserId) || 
                            String(u.phone) === String(currentUserId)
                        );

                        if (userIndex !== -1) {
                            users[userIndex].avatarImg = avatarBase64;
                            localStorage.setItem('talkoUsers', JSON.stringify(users));
                        }

                        loadProfileUI();
                        renderContacts();
                        alert('Profile picture updated successfully!');
                    } catch (err) {
                        alert('Storage limit reached! Could not save the image.');
                    }
                };
                reader.readAsDataURL(file);
            };
        });
    }

    // Blocked Accounts Modal Logic
    const optBlockedUsers = document.getElementById('optBlockedUsers');
    const blockedModal = document.getElementById('blockedModal');
    const blockedList = document.getElementById('blockedList');
    const closeBlockedModal = document.getElementById('closeBlockedModal');

    if (optBlockedUsers && blockedModal) {
        optBlockedUsers.addEventListener('click', () => {
            renderBlockedList();
            blockedModal.classList.remove('hidden');
        });
    }

    function renderBlockedList() {
        if (!blockedList) return;
        blockedList.innerHTML = '';
        let blockedFound = false;

        const currentContacts = getContactsList();
        currentContacts.forEach(contact => {
            const blockKey = `blocked_${currentUserId}_${contact.id || contact.username}`;
            if (localStorage.getItem(blockKey) === 'true') {
                blockedFound = true;
                const li = document.createElement('li');
                li.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;";
                
                const nameSpan = document.createElement('span');
                nameSpan.textContent = contact.name || contact.username;

                const unblockBtn = document.createElement('button');
                unblockBtn.textContent = 'Unblock';
                unblockBtn.style.cssText = "padding:4px 8px; cursor:pointer;";
                unblockBtn.onclick = () => unblockContact(contact.id || contact.username);

                li.appendChild(nameSpan);
                li.appendChild(unblockBtn);
                blockedList.appendChild(li);
            }
        });

        if (!blockedFound) {
            blockedList.innerHTML = '<li>No blocked accounts found.</li>';
        }
    }

    if (closeBlockedModal) {
        closeBlockedModal.addEventListener('click', () => {
            blockedModal.classList.add('hidden');
        });
    }

    function unblockContact(contactId) {
        const blockKey = `blocked_${currentUserId}_${contactId}`;
        localStorage.setItem(blockKey, 'false');
        alert('User Unblocked!');
        renderBlockedList();
        if (activeChatId === contactId) {
            const currentContacts = getContactsList();
            const activeContact = currentContacts.find(c => (c.id || c.username) === contactId);
            if (activeContact) selectChat(activeContact);
        }
    }

    // --- 3. CHAT & CONTACTS LOGIC ---
    const chatList = document.getElementById('chatList');

    function renderContacts() {
        if (!chatList) return;
        chatList.innerHTML = '';

        const contacts = getContactsList();

        contacts.forEach((contact) => {
            const contactId = contact.id || contact.username;
            const item = document.createElement('div');
            item.className = `chat-item ${activeChatId === contactId ? 'active' : ''}`;

            const isOnline = String(contact.status).toLowerCase() === 'online';
            const statusColor = isOnline ? '#22c55e' : '#9ca3af';
            
            const avatarContent = contact.avatarImg 
                ? `<img src="${contact.avatarImg}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />` 
                : (contact.avatar || (contact.name ? contact.name.charAt(0).toUpperCase() : 'U'));

            item.innerHTML = `
                <div class="avatar">${avatarContent}</div>
                <div class="chat-item-details">
                    <div class="chat-item-name">${escapeHTML(contact.name || contact.username)}</div>
                    <div class="chat-item-status status" style="color: ${statusColor} !important;">${escapeHTML(contact.status)}</div>
                </div>
            `;
            
            item.addEventListener('click', () => selectChat(contact));
            chatList.appendChild(item);
        });
    }

    function selectChat(contact) {
        if (!contact) return;
        activeChatId = contact.id || contact.username;
        
        // Highlight active sidebar contact
        const allItems = document.querySelectorAll('.chat-item');
        const contacts = getContactsList();
        allItems.forEach((item, index) => {
            const cId = contacts[index]?.id || contacts[index]?.username;
            if (cId === activeChatId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Header Info
        if (activeNameEl) activeNameEl.textContent = contact.name || contact.username;
        
        if (activeStatusEl) {
            const isOnline = String(contact.status).trim().toLowerCase() === 'online';
            activeStatusEl.textContent = isOnline ? 'Online' : 'Offline';
            activeStatusEl.style.setProperty('color', isOnline ? '#22c55e' : '#9ca3af', 'important');
        }

        if (activeChatAvatarEl) {
            if (contact.avatarImg) {
                activeChatAvatarEl.innerHTML = `<img src="${contact.avatarImg}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
            } else {
                const displayName = contact.name || contact.username || 'U';
                activeChatAvatarEl.textContent = contact.avatar || displayName.charAt(0).toUpperCase();
            }
        }

        const blockUserBtn = document.getElementById('blockUserBtn');
        if (blockUserBtn && activeChatId) {
            const blockKey = `blocked_${currentUserId}_${activeChatId}`;
            const isBlocked = localStorage.getItem(blockKey) === 'true';
            blockUserBtn.textContent = isBlocked ? '✅ Unblock User' : '🚫 Block User';
        }

        loadMessages();
    }

    function loadMessages() {
        const container = document.getElementById('messagesContainer');
        if (!container) return;
        container.innerHTML = '';

        if (!activeChatId) {
            container.innerHTML = '<div class="welcome-msg">Select a chat to start messaging on Talko</div>';
            return;
        }

        const chatKey = `chat_${currentUserId}_${activeChatId}`;
        const messages = JSON.parse(localStorage.getItem(chatKey)) || [];

        if (messages.length === 0) {
            const activeName = document.getElementById('activeChatName')?.textContent || 'contact';
            container.innerHTML = `<div class="welcome-msg">Say hello to ${escapeHTML(activeName)}!</div>`;
            return;
        }

        messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${msg.sender === 'me' ? 'sent' : 'received'}`;

            if (msg.type === 'image') {
                const img = document.createElement('img');
                img.src = msg.text;
                img.className = 'chat-img-preview';
                img.alt = 'sent image';
                msgDiv.appendChild(img);
            } else {
                msgDiv.textContent = msg.text;
            }
            container.appendChild(msgDiv);
        });

        container.scrollTop = container.scrollHeight;
    }

    // --- 4. MESSAGING ENGINE ---
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const imageInput = document.getElementById('imageInput');

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = messageInput.value.trim();
            if (!text || !activeChatId) return;

            saveAndSendMsg('text', text);
            messageInput.value = '';
        });
    }

    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file || !activeChatId) return;

            if (file.size > 1.5 * 1024 * 1024) {
                alert('Image is too large. Choose a file under 1.5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (evt) {
                saveAndSendMsg('image', evt.target.result);
                imageInput.value = '';
            };
            reader.readAsDataURL(file);
        });
    }

    function saveAndSendMsg(type, content) {
        const blockKey = `blocked_${currentUserId}_${activeChatId}`;
        if (localStorage.getItem(blockKey) === 'true') {
            alert('You have blocked this user. Unblock to send messages.');
            return;
        }

        const chatKey = `chat_${currentUserId}_${activeChatId}`;
        const messages = JSON.parse(localStorage.getItem(chatKey)) || [];

        const userMsg = { 
            sender: 'me', 
            type: type, 
            text: content, 
            timestamp: new Date().toISOString() 
        };

        messages.push(userMsg);
        
        try {
            localStorage.setItem(chatKey, JSON.stringify(messages));
        } catch (e) {
            alert('Local storage limit reached! Delete old messages to send more.');
            return;
        }

        loadMessages();

        // Simulated Auto-Reply
        setTimeout(() => {
            const replies = [
                "Hey! Thanks for reaching out through Talko App! 🚀",
                "Got your message! Doing awesome, how about you?",
                "Awesome photo! 🔥",
                "This Talko Chat UI works so smooth, right? 🔥"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            messages.push({ 
                sender: 'other', 
                type: 'text', 
                text: randomReply, 
                timestamp: new Date().toISOString() 
            });
            localStorage.setItem(chatKey, JSON.stringify(messages));
            loadMessages();
        }, 1200);
    }

    // --- 5. EXTRA CONTROLS ---
    window.addEventListener('storage', (e) => {
        if (e.key && e.key.startsWith('chat_')) {
            loadMessages();
        }
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.replace('login.html');
        });
    }

    const menuBtn = document.getElementById('menuBtn');
    const chatDropdown = document.getElementById('chatDropdown');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const blockUserBtn = document.getElementById('blockUserBtn');
    const reportUserBtn = document.getElementById('reportUserBtn');

    if (menuBtn && chatDropdown) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            chatDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
            chatDropdown.classList.add('hidden');
        });
    }

    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', () => {
            if (!activeChatId) return alert('Select a chat first!');
            
            if (confirm('Are you sure you want to clear this chat history?')) {
                const chatKey = `chat_${currentUserId}_${activeChatId}`;
                localStorage.removeItem(chatKey);
                loadMessages();
            }
        });
    }

    if (blockUserBtn) {
        blockUserBtn.addEventListener('click', () => {
            if (!activeChatId) return alert('Select a chat first!');

            const blockKey = `blocked_${currentUserId}_${activeChatId}`;
            const isBlocked = localStorage.getItem(blockKey) === 'true';

            if (isBlocked) {
                localStorage.setItem(blockKey, 'false');
                alert('User Unblocked!');
                blockUserBtn.textContent = '🚫 Block User';
            } else {
                if (confirm('Do you want to block this user?')) {
                    localStorage.setItem(blockKey, 'true');
                    alert('User Blocked successfully!');
                    blockUserBtn.textContent = '✅ Unblock User';
                }
            }
        });
    }

    if (reportUserBtn) {
        reportUserBtn.addEventListener('click', () => {
            if (!activeChatId) return alert('Select a chat first!');
            alert('User has been reported to Talko support team.');
        });
    }

    // Initial Render
    renderContacts();
});