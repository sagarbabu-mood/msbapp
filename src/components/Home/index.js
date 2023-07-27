import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const languages = [
  {
    id: 1,
    name: 'HTML',
    image:
      'https://img.freepik.com/free-photo/programming-background-with-html-text_23-2150040411.jpg?w=900&t=st=1690212069~exp=1690212669~hmac=d8c051768ba0e68c66ceba29acee8f7b6b629aa9ddf8d4a75ed4078249b28750',
    subtitle: 'MCQ Practice',
    testLink: '/test/html',
  },
  {
    id: 2,
    name: 'CSS',
    image:
      'https://img.freepik.com/premium-photo/seo-search-engine-optimization-text-wooden-cube-blocks-table-background-idea-strategy-advertising-marketing-keyword-content-concept_301012-3474.jpg?w=900',
    subtitle: 'MCQ Practice',
    testLink: '',
  },
  {
    id: 3,
    name: 'Python ',
    image:
      'https://img.freepik.com/premium-photo/python-programming-language-server-room-background-programing-workflow-abstract-algorithm-concept-virtual-screen_161452-3641.jpg?size=626&ext=jpg&ga=GA1.1.1298913440.1690211962&semt=ais',
    subtitle: 'MCQ Practice',
    testLink: '',
  },
  {
    id: 4,
    name: 'JavaScript',
    image:
      'https://img.freepik.com/premium-photo/javascript-code-computer-language-programming-internet-text-editor-components_73523-1353.jpg?size=626&ext=jpg&ga=GA1.1.1298913440.1690211962&semt=ais',
    subtitle: 'MCQ Practice',
    testLink: '',
  },
  {
    id: 5,
    name: 'SQL',
    image:
      'https://img.freepik.com/free-photo/system-backup-database-integration_53876-133637.jpg?size=626&ext=jpg&ga=GA1.1.1298913440.1690211962&semt=ais',
    subtitle: 'MCQ Practice',
    testLink: '',
  },
  // Add other languages here...
]

const LanguageCard = ({language}) => {
  const {name, image, subtitle, testLink} = language
  return (
    <div className="language-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{subtitle}</p>
      {testLink ? (
        <Link to={testLink}>
          <button type="button">Start Test</button>
        </Link>
      ) : (
        <p>Under process...</p>
      )}
    </div>
  )
}

const Home = props => {
  const handleLogout = () => {
    Cookies.remove('sagar_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="home-container">
      <h2>MCQ Practice</h2>
      <div className="language-cards">
        {languages.map(language => (
          <LanguageCard key={language.id} language={language} />
        ))}
      </div>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home
