const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component{
  constructor(props) {
    super(props)
    window.backgroundComponent = this;
    this.state = {
        quotes: [
          {
          "quote":"Life isn’t about getting and having, it’s about giving and being.",
          "author":"Kevin Kruse"
          }
        ],
        colors :  [
          '#FFC312',
          '#C4E538',
          '#12CBC4',
          '#FDA7DF',
          '#ED4C67',
          '#F79F1F',
          '#A3CB38',
          '#1289A7',
          '#D980FA',
          '#B53471',
          '#EE5A24',
          '#009432',
          '#0652DD',
          '#9980FA',
          '#833471',
          '#EA2027',
          '#006266',
          '#1B1464',
          '#5758BB',
          '#6F1E51'
        ] ,
        index: 0
    }
  }
  

componentDidMount(){
    // call the API and update state
    fetch(API).then(res => res.json())
      .then(res => {
        this.setState({
          quotes: res.quotes
        }, this.getRandomIndex);
    });
    
}
  
getRandomIndex = () => {
    const {quotes, colors} = this.state;
    
    if(quotes.length > 0){
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      })
    }

    const cIndex = Math.floor(Math.random() * colors.length);

    document.body.style.background = colors[cIndex];
}
  
render(){
    const {quotes, index} = this.state;
    
    const quote = quotes[index];
    
    const tweetURL =`https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`;
    
    return(
        <div className="wrapper d-flex  align-items-center justify-content-center">
            <div className="col-6 col-sm-3 box p-4 rounded" id="quote-box">
                { 
                    quote && (
                    <div className="mb-4 .container-sm">
                        <p id="text" className="quote"><strong><i className="fas fa-quote-left fa-2x"></i> {quote.quote}</strong></p>
                        
                        <div className = "writer" >
                          <cite className="d-block text-center" id="author" className="author">
                          - {quote.author}
                          </cite>
                        </div>                        
                    </div>
                    )  
                }
    
            
                <div className="d-flex justify-content-between buttons">
                    <a className="btn btn-primary" target="_blank" href = {tweetURL} id="tweet-quote"><i className="fab fa-twitter"></i> Tweet</a>
                    <button className="btn  btn-outline-primary" onClick={this.getRandomIndex} id="new-quote">
                    Get Quote
                    </button>
                </div>
            </div>
        </div>
    )
  }
} 

ReactDOM.render(<App />, document.getElementById("app"));

// spacebar funtionality
document.body.addEventListener('keydown',  function pressedKey(e){
  var keyCode = (window.event) ? e.which : e.keyCode;
  if (keyCode == 32){
    console.log("Spacebar pressed");
    window.backgroundComponent.getRandomIndex();
  }
})



