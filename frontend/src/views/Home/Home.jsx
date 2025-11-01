import '../Home/Home.css'
import '../../App.css'
import BookSlider from '../../components/BookSlider/BookSlider';  
import TeacherSlider from '../../components/TeacherSlider/TeacherSlider';

export default function Home() {
  const green = '#a2c257ff'
  const blue = '#36c6ceff'
  const pink = '#d78477ff'
  const yellow = '#e4dd7eff'

  return (
    <div className="container-fluid px-3 px-md-5 mb-5">
      {/* HERO SECTION */}
      <div className="hero-container box-shadow my-5 p-4 rounded-4">
        <div className="row align-items-center">
          {/* LEFT SIDE */}
          <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
            <h1 className="fw-bold display-5 mb-4">Welcome to the Future of Learning</h1>
            <ul className="list-unstyled fs-5">
              <li>📚 Students, teachers, writers, and readers — everyone is here.</li>
              <li>💡 An interactive and personalized learning platform.</li>
              <li>✍️ Write your digital books, find a private tutor, and track your learning journey.</li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-12 col-lg-6 d-flex flex-wrap justify-content-center justify-content-lg-end gap-3">
            <button className="item px-4 py-3 fw-semibold text-white rounded-3 border-0 shadow-sm"
              style={{ background: blue }}>Digital Book Writing</button>

            <button className="item px-4 py-3 fw-semibold text-white rounded-3 border-0 shadow-sm"
              style={{ background: green }}>Private Lesson Matching</button>

            <button className="item px-4 py-3 fw-semibold text-white rounded-3 border-0 shadow-sm"
              style={{ background: pink }}>Student Tracking System</button>

            <button className="item px-4 py-3 fw-semibold text-white rounded-3 border-0 shadow-sm"
              style={{ background: yellow }}>Personal Accounts</button>
          </div>
        </div>
      </div>

      {/* BOOKS SECTION */}
      <div className="container mt-5 mb-5">
        <BookSlider />
      </div>

      {/* TEACHERS SECTION */}
      <div className="container mt-5 mb-5">
       
     <TeacherSlider/>
      </div>
    </div>
  );}
