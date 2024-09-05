//dark mode 
const darkmodeEl = document.querySelector('.form-check-input');
const htmldarkEl = document.querySelector('html');
const darktextEl = document.querySelector('.form-check-label')

const darkmodefn = () => { 
    if (darkmodeEl.checked) {
        htmldarkEl.dataset.bsTheme = 'dark';
        darktextEl.innerText = "Light?";
    } else {htmldarkEl.dataset.bsTheme = 'light';
        darktextEl.innerText = "Dark?";
    }}; 

darkmodeEl.addEventListener('change', darkmodefn)


const validEmail = "uparupa97@icloud.com";
const validPassword = "1234";

document.getElementById('mainContent').style.display = 'none';


    // 로그인 폼 처리
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 제출 방지
  
        // 사용자 입력값 가져오기
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
        // 입력된 정보가 미리 정의된 정보와 일치하는지 확인
        if (email === validEmail && password === validPassword) {
          // 로그인 성공 시 로그인 섹션 숨기기
          document.getElementById('loginSection').style.display = 'none';
  
          // 다음 섹션 표시
          const nextSection = document.getElementById('nextSection');
          nextSection.style.display = 'flex';
  
          // 다음 섹션 메시지 설정
          
          const nextMessage = document.getElementById('nextMessage');
          nextMessage.innerText = `${email}님, 독서기록을 남기실까요?`;
          document.getElementById('mainContent').style.display = 'block';
        } else {
          // 로그인 실패 시 오류 메시지 표시
          const errorMessageDiv = document.getElementById('errorMessage');
          errorMessageDiv.innerText = "로그인 정보가 잘못되었습니다. 다시 시도해주세요.";
          errorMessageDiv.style.display = 'block';
          document.getElementById('mainContent').style.display = 'none';

        }
      });


        // 로컬 스토리지에 저장된 책 목록 불러오기
  window.onload = function() {
    const storedBooks = JSON.parse(localStorage.getItem('bookList')) || [];
    storedBooks.forEach(book => {
      createBookCard(book);
    });
  };

  // 메모 모달 열기
  function openMemo(button) {
    const memoModal = button.closest('.card-body').querySelector('.memoModal');
    memoModal.style.display = 'block';
  }

  // 메모 모달 닫기
  function closeMemo(button) {
    const memoModal = button.closest('.memoModal');
    memoModal.style.display = 'none';
  }

  // 새 책 추가
  function addBook() {
    const bookImage = document.getElementById('bookImage').value;
    const bookTitle = document.getElementById('bookTitle').value;
    const bookSource = document.getElementById('bookSource').value;
    const bookCategory = document.getElementById('bookCategory').value;
    const bookMemo = document.getElementById('bookMemo').value;

    const newBook = {
      image: bookImage,
      title: bookTitle,
      source: bookSource,
      category: bookCategory,
      memo: bookMemo
    };

    // 책 카드 생성 및 추가
    createBookCard(newBook);

    // 로컬 스토리지에 책 저장
    const storedBooks = JSON.parse(localStorage.getItem('bookList')) || [];
    storedBooks.push(newBook);
    localStorage.setItem('bookList', JSON.stringify(storedBooks));

    // 책 추가 모달 닫기
    const addBookModal = new bootstrap.Modal(document.getElementById('addBookModal'));
    addBookModal.hide();
    document.getElementById('newBookForm').reset();
  }

  // 새 책 카드 생성
  function createBookCard(book) {
    const bookList = document.getElementById('bookList');

    const newCol = document.createElement('div');
    newCol.className = 'col-6 col-sm-3 book-card';
    newCol.innerHTML = `
      <div class="card" style="width: 13rem;">
        <img src="${book.image}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${book.source}</p>
          <p class="card-text">${book.category}</p>
          <button class="btn btn-primary" onclick="openMemo(this)">내용 메모</button>
          <div class="memoModal" style="display: none;">
            <div class="memo-content">
              <h5>메모 작성</h5>
              <textarea rows="4" cols="50" placeholder="메모를 입력하세요...">${book.memo}</textarea><br>
              <button class="btn btn-secondary" onclick="closeMemo(this)">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // 새로운 책 카드를 추가
    bookList.appendChild(newCol);
  }


  let currentBookIndex = null; // 현재 삭제 또는 이동할 책의 인덱스

// 새 책 카드 생성 (기존 기능에 추가)
function createBookCard(book, index) {
  const bookList = document.getElementById('bookList');

  const newCol = document.createElement('div');
  newCol.className = 'col-6 col-sm-3 book-card';
  newCol.innerHTML = `
    <div class="card" style="width: 13rem;">
      <img src="${book.image}" class="card-img-top" alt="${book.title}">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.source}</p>
        <p class="card-text">${book.category}</p>
        <button class="btn btn-primary" onclick="openMemo(this)">내용 메모</button>
        <button class="btn btn-warning" onclick="showMoveModal(${index})">읽었던 책으로 이동</button>
        <button class="btn btn-danger" onclick="showDeleteModal(${index})">삭제</button>
        <div class="memoModal" style="display: none;">
          <div class="memo-content">
            <h5>메모 작성</h5>
            <textarea rows="4" cols="50" placeholder="메모를 입력하세요...">${book.memo}</textarea><br>
            <button class="btn btn-secondary" onclick="closeMemo(this)">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // 새로운 책 카드를 추가
  bookList.appendChild(newCol);
}

// 책 삭제 모달 열기
function showDeleteModal(index) {
  currentBookIndex = index; // 삭제할 책의 인덱스 저장
  var deleteModal = new bootstrap.Modal(document.getElementById('deleteBookModal'));
  deleteModal.show();
}

// 책 삭제 기능
function deleteBook() {
  const storedBooks = JSON.parse(localStorage.getItem('bookList')) || [];
  const readBooks = JSON.parse(localStorage.getItem('readBookList')) || [];

  storedBooks.splice(currentBookIndex, 1); // 선택한 책 삭제
  localStorage.setItem('bookList', JSON.stringify(storedBooks));

  readBooks.splice(currentBookIndex, 1); 
  localStorage.setItem('readBookList', JSON.stringify(readBooks));

  document.getElementById('bookList').innerHTML = ''; // 기존 책 목록 초기화
  storedBooks.forEach((book, index) => createBookCard(book, index)); // 남은 책 목록 다시 그리기

  document.getElementById('readBookList').innerHTML = ''; 
  readBooks.forEach((book, index) => createReadBookCard(book, index));


  const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteBookModal'));
  deleteModal.hide();
}

// 읽었던 책으로 이동 모달 열기
function showMoveModal(index) {
  currentBookIndex = index; // 이동할 책의 인덱스 저장
  const moveModal = new bootstrap.Modal(document.getElementById('moveBookModal'));
  moveModal.show();
}

// 책 읽었던 목록으로 이동 기능
function moveBook() {
  const storedBooks = JSON.parse(localStorage.getItem('bookList')) || [];
  const readBooks = JSON.parse(localStorage.getItem('readBookList')) || [];

  const bookToMove = storedBooks.splice(currentBookIndex, 1)[0]; // 선택한 책을 읽었던 책으로 이동
  readBooks.push(bookToMove);
  localStorage.setItem('bookList', JSON.stringify(storedBooks));
  localStorage.setItem('readBookList', JSON.stringify(readBooks));

  // 책 목록 다시 그리기
  document.getElementById('bookList').innerHTML = '';
  storedBooks.forEach((book, index) => createBookCard(book, index));

  // 읽었던 책 목록 다시 그리기
  document.getElementById('readBookList').innerHTML = '';
  readBooks.forEach((book, index) => createReadBookCard(book, index));

  var moveModal = bootstrap.Modal.getInstance(document.getElementById('moveBookModal'));
  moveModal.hide();
}

//읽은 책 추가 
function addReadBook() {
    const bookImageRead = document.getElementById('bookImageRead').value;
    const bookTitleRead = document.getElementById('bookTitleRead').value;
    const bookSourceRead = document.getElementById('bookSourceRead').value;
    const bookCategoryRead = document.getElementById('bookCategoryRead').value;
    const bookMemoRead = document.getElementById('bookMemoRead').value;

    const newBook = {
      image: bookImageRead,
      title: bookTitleRead,
      source: bookSourceRead,
      category: bookCategoryRead,
      memo: bookMemoRead
    };

    // 책 카드 생성 및 추가
    createReadBookCard(newBook);

    // 로컬 스토리지에 책 저장
    const readBooks = JSON.parse(localStorage.getItem('readBookList')) || [];
    readBooks.push(newBook);
    localStorage.setItem('readBookList', JSON.stringify(readBooks));

    // 책 추가 모달 닫기
    const addReadBookModal = new bootstrap.Modal(document.getElementById('addReadBookModal'));
    addReadBookModal.hide();
    document.getElementById('newReadBookForm').reset();
  }


// 읽었던 책 카드 생성
function createReadBookCard(book, index) {
  const readBookList = document.getElementById('readBookList');

  const newCol = document.createElement('div');
  newCol.className = 'col-6 col-sm-2 book-card';
  newCol.innerHTML = `
    <div class="card" style="width: 13rem;">
      <img src="${book.image}" class="card-img-top" alt="${book.title}">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.source}</p>
        <p class="card-text">${book.category}</p>
        <button class="btn btn-primary" onclick="openMemo(this)">내용 메모</button>
        <button class="btn btn-danger" onclick="showDeleteModal(${index})">삭제</button>
        <div class="memoModal" style="display: none;">
          <div class="memo-content">
            <h5>메모 작성</h5>
            <textarea rows="4" cols="50" placeholder="메모를 입력하세요...">${book.memo}</textarea><br>
            <button class="btn btn-secondary" onclick="closeMemo(this)">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // 새로운 책 카드를 추가
  readBookList.appendChild(newCol);
}

// // 읽고싶은 책 목록 만들기 

// //읽은 책 추가 
// function addReadBook() {
//     const bookImageRead = document.getElementById('bookImageRead').value;
//     const bookTitleRead = document.getElementById('bookTitleRead').value;
//     const bookSourceRead = document.getElementById('bookSourceRead').value;
//     const bookCategoryRead = document.getElementById('bookCategoryRead').value;
//     const bookMemoRead = document.getElementById('bookMemoRead').value;

//     const newBook = {
//       image: bookImageRead,
//       title: bookTitleRead,
//       source: bookSourceRead,
//       category: bookCategoryRead,
//       memo: bookMemoRead
//     };

//     // 책 카드 생성 및 추가
//     createReadBookCard(newBook);

//     // 로컬 스토리지에 책 저장
//     const readBooks = JSON.parse(localStorage.getItem('readBookList')) || [];
//     readBooks.push(newBook);
//     localStorage.setItem('readBookList', JSON.stringify(readBooks));

//     // 책 추가 모달 닫기
//     const addReadBookModal = new bootstrap.Modal(document.getElementById('addReadBookModal'));
//     addReadBookModal.hide();
//     document.getElementById('newReadBookForm').reset();
//   }


// // 읽었던 책 카드 생성
// function createReadBookCard(book, index) {
//   const readBookList = document.getElementById('readBookList');

//   const newCol = document.createElement('div');
//   newCol.className = 'col-6 col-sm-2 book-card';
//   newCol.innerHTML = `
//     <div class="card" style="width: 13rem;">
//       <img src="${book.image}" class="card-img-top" alt="${book.title}">
//       <div class="card-body">
//         <h5 class="card-title">${book.title}</h5>
//         <p class="card-text">${book.source}</p>
//         <p class="card-text">${book.category}</p>
//         <button class="btn btn-primary" onclick="openMemo(this)">내용 메모</button>
//         <button class="btn btn-danger" onclick="showDeleteModal(${index})">삭제</button>
//         <div class="memoModal" style="display: none;">
//           <div class="memo-content">
//             <h5>메모 작성</h5>
//             <textarea rows="4" cols="50" placeholder="메모를 입력하세요...">${book.memo}</textarea><br>
//             <button class="btn btn-secondary" onclick="closeMemo(this)">Close</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;

//   // 새로운 책 카드를 추가
//   readBookList.appendChild(newCol);
// }


// 페이지 로드 시 로컬스토리지에서 책 목록 불러오기
window.onload = function() {
  const storedBooks = JSON.parse(localStorage.getItem('bookList')) || [];
  const readBooks = JSON.parse(localStorage.getItem('readBookList')) || [];

  storedBooks.forEach((book, index) => createBookCard(book, index));
  readBooks.forEach((book, index) => createReadBookCard(book, index));
};