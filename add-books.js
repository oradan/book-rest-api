
const { MongoClient, ServerApiVersion } = require('mongodb');

const allBooks = [
    {
        author:'Gabor Mate',
        name:'Cand corpul spune nu',
        img:'cand-corpul-spune-nu.PNG',
        rates:3,
        price:5155,
        categoryCode:'RO',
        publisher:'Curtea Veche',
        descriptionId:'D1',
        shopId:['sh1','sh3']
    },
    {
        author:'Colleen Hoover',
        name:'Totul se termina cu noi',
        img:'totul-se-termina-cu-noi.PNG',
        rates:4,
        price:8899,
        categoryCode:'SF',
        publisher:'Epica',
        descriptionId:'D2',
        shopId:['sh4','sh5']
    }
  ]

  
bookRouter.route('/add-all-books').get((req,res)=>{
    let clientDB = new MongoClient(dbURL,
      {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverApi: ServerApiVersion.v1
      }
  );
    (async function mongoConect(){
      let client;
      try {
        client = await clientDB.connect();
        console.log("conected")
        const db = client.db(dbName);
        const response = await db.collection('books').insertMany(allBooks);   
        res.json(response) ;       
      } catch (error) {
        console.log(error)
      }
      client.close()
    })()
  
    
  })
  