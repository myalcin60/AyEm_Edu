import '../Home/Home.css'
import '../../App.css'
import BookCarousel from '../../components/BookSlider/BookSlider';  
import TeacherCard from '../../components/TeacherCard/TeacherCard';

export default function Home() {

  const green = '#a2c257ff'
  const blue = '#36c6ceff'
  const pink = '#d78477ff'
  const yellow = '#e4dd7eff'


  return (
    <div className='container-fluid'>
      <div className="mt-5 hero-container box-shadow mb-5">
        <div className="hero d-flex gap-5">
          <div className="f-left p-3">
            <h1>Welcome to the Future of Learning</h1>
            <ul>
              <li>Students, teachers, writers, and readers — everyone is here.</li>
              <li>An interactive and personalized learning platform.</li>
              <li>Write your digital books, find a private tutor, and track your learning journey.</li>
            </ul>
          </div>

          <div className="f-right p-3 mt-5">
            <button className="item m-3" style={{ background: blue }}>Digital Book Writing</button>
            <button className="item m-3" style={{ background: green }}>Private Lesson Matching</button>
            <button className="item m-3" style={{ background: pink }}>Student Tracking System</button>
            <button className="item m-3" style={{ background: yellow }}>Personal Accounts</button>
          </div>
        </div>
      </div>
   
      <div className="container mt-5">
        <BookCarousel />
      </div>

      <h2>Auhors & Teachers of the Month</h2>
      <TeacherCard />
    </div>
  );

}

