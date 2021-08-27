
function Copyright() {
    let redirectToMyGithubPage = () => {
      window.location.href = 'https://github.com/Dramane-dev';
    }
  
    return (
      <footer className="footer">
        <p 
         className="footer-content" 
         onClick={() => { redirectToMyGithubPage() }}
        >
            { 'Dramane Dev - ' }
            { 'Copyright © ' }
            { new Date().getFullYear() }
            {'.'}
        </p>
      </footer>
    );
}

export default Copyright;