export const initialQuestions = [

  // ============================================================
  // EASY - 40 QUESTIONS
  // ============================================================

  {
    id: 1,
    level: "easy",
    topic: "MERN",
    question: "What does MERN stand for?",
    options: [
      "MongoDB, Express.js, React, Node.js",
      "MySQL, Express, React, Node",
      "MongoDB, Ember, React, Node",
      "MariaDB, Express, Redux, Node"
    ],
    answer: 0,
    explanation: "MERN stands for MongoDB, Express.js, React, and Node.js."
  },

  {
    id: 2,
    level: "easy",
    topic: "Node.js",
    question: "What is Node.js?",
    options: [
      "A database",
      "A JavaScript runtime environment",
      "A CSS framework",
      "A web browser"
    ],
    answer: 1,
    explanation: "Node.js is a JavaScript runtime environment that allows JavaScript to run outside the browser."
  },

  {
    id: 3,
    level: "easy",
    topic: "Express.js",
    question: "What is Express.js?",
    options: [
      "A database",
      "A JavaScript framework for Node.js",
      "A frontend library",
      "An operating system"
    ],
    answer: 1,
    explanation: "Express.js is a lightweight web application framework built on Node.js."
  },

  {
    id: 4,
    level: "easy",
    topic: "React",
    question: "What is React?",
    options: [
      "A database",
      "A JavaScript library for building user interfaces",
      "A backend framework",
      "A programming language"
    ],
    answer: 1,
    explanation: "React is a JavaScript library used mainly for building user interfaces."
  },

  {
    id: 5,
    level: "easy",
    topic: "MongoDB",
    question: "What type of database is MongoDB?",
    options: [
      "Relational",
      "NoSQL",
      "Hierarchical",
      "Network"
    ],
    answer: 1,
    explanation: "MongoDB is a NoSQL document-oriented database."
  },

  {
    id: 6,
    level: "easy",
    topic: "MongoDB",
    question: "What format is commonly used to represent MongoDB documents?",
    options: [
      "HTML",
      "JSON-like BSON",
      "CSS",
      "XML only"
    ],
    answer: 1,
    explanation: "MongoDB stores documents internally in BSON, a binary JSON-like format."
  },

  {
    id: 7,
    level: "easy",
    topic: "Node.js",
    question: "Which command initializes a Node.js project?",
    options: [
      "node start",
      "npm init",
      "npm create-node",
      "node init"
    ],
    answer: 1,
    explanation: "npm init creates a package.json file and initializes a Node.js project."
  },

  {
    id: 8,
    level: "easy",
    topic: "npm",
    question: "What does npm stand for?",
    options: [
      "Node Package Manager",
      "New Programming Module",
      "Node Program Method",
      "Network Package Manager"
    ],
    answer: 0,
    explanation: "npm stands for Node Package Manager."
  },

  {
    id: 9,
    level: "easy",
    topic: "Node.js",
    question: "Which file normally contains Node.js project dependencies?",
    options: [
      "index.html",
      "package.json",
      "server.css",
      "database.js"
    ],
    answer: 1,
    explanation: "package.json contains project metadata, scripts, and dependencies."
  },

  {
    id: 10,
    level: "easy",
    topic: "Express.js",
    question: "Which method creates an Express application?",
    options: [
      "express.create()",
      "express()",
      "createExpress()",
      "new Express()"
    ],
    answer: 1,
    explanation: "Calling express() creates an Express application instance."
  },

  {
    id: 11,
    level: "easy",
    topic: "Express.js",
    question: "Which method is commonly used to define a GET route?",
    options: [
      "app.get()",
      "app.fetch()",
      "app.read()",
      "app.request()"
    ],
    answer: 0,
    explanation: "app.get() defines a route that handles HTTP GET requests."
  },

  {
    id: 12,
    level: "easy",
    topic: "Express.js",
    question: "Which method is commonly used to define a POST route?",
    options: [
      "app.send()",
      "app.post()",
      "app.create()",
      "app.add()"
    ],
    answer: 1,
    explanation: "app.post() handles HTTP POST requests."
  },

  {
    id: 13,
    level: "easy",
    topic: "REST API",
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Application Process Internet",
      "Advanced Programming Interface",
      "Application Program Internet"
    ],
    answer: 0,
    explanation: "API stands for Application Programming Interface."
  },

  {
    id: 14,
    level: "easy",
    topic: "REST API",
    question: "What does REST stand for?",
    options: [
      "Remote Execution Standard Technology",
      "Representational State Transfer",
      "Responsive State Technology",
      "Remote State Transfer"
    ],
    answer: 1,
    explanation: "REST stands for Representational State Transfer."
  },

  {
    id: 15,
    level: "easy",
    topic: "HTTP",
    question: "Which HTTP method is normally used to retrieve data?",
    options: [
      "POST",
      "GET",
      "DELETE",
      "PATCH"
    ],
    answer: 1,
    explanation: "GET is normally used to retrieve resources."
  },

  {
    id: 16,
    level: "easy",
    topic: "HTTP",
    question: "Which HTTP method is commonly used to create data?",
    options: [
      "GET",
      "POST",
      "DELETE",
      "HEAD"
    ],
    answer: 1,
    explanation: "POST is commonly used to submit or create a resource."
  },

  {
    id: 17,
    level: "easy",
    topic: "HTTP",
    question: "Which HTTP method is commonly used to delete data?",
    options: [
      "GET",
      "POST",
      "DELETE",
      "OPTIONS"
    ],
    answer: 2,
    explanation: "DELETE is used to remove a resource."
  },

  {
    id: 18,
    level: "easy",
    topic: "HTTP",
    question: "What does HTTP status code 200 indicate?",
    options: [
      "Not Found",
      "Server Error",
      "Successful request",
      "Unauthorized"
    ],
    answer: 2,
    explanation: "HTTP 200 indicates that the request was successful."
  },

  {
    id: 19,
    level: "easy",
    topic: "HTTP",
    question: "What does HTTP status code 404 mean?",
    options: [
      "Success",
      "Not Found",
      "Created",
      "Unauthorized"
    ],
    answer: 1,
    explanation: "HTTP 404 means that the requested resource was not found."
  },

  {
    id: 20,
    level: "easy",
    topic: "HTTP",
    question: "What does HTTP status code 500 indicate?",
    options: [
      "Client success",
      "Not Found",
      "Internal Server Error",
      "Created"
    ],
    answer: 2,
    explanation: "HTTP 500 indicates an internal server error."
  },

  {
    id: 21,
    level: "easy",
    topic: "MongoDB",
    question: "What is a collection in MongoDB?",
    options: [
      "A group of documents",
      "A JavaScript function",
      "A server",
      "An API"
    ],
    answer: 0,
    explanation: "A MongoDB collection is a group of related documents."
  },

  {
    id: 22,
    level: "easy",
    topic: "MongoDB",
    question: "What is a document in MongoDB?",
    options: [
      "A database server",
      "A record stored as a BSON document",
      "A React component",
      "An Express route"
    ],
    answer: 1,
    explanation: "A MongoDB document is a record stored in BSON format."
  },

  {
    id: 23,
    level: "easy",
    topic: "Mongoose",
    question: "What is Mongoose?",
    options: [
      "A frontend framework",
      "An ODM for MongoDB and Node.js",
      "A database server",
      "A CSS library"
    ],
    answer: 1,
    explanation: "Mongoose is an Object Data Modeling library for MongoDB and Node.js."
  },

  {
    id: 24,
    level: "easy",
    topic: "Mongoose",
    question: "Which function is used to connect Mongoose to MongoDB?",
    options: [
      "mongoose.connect()",
      "mongoose.open()",
      "mongoose.start()",
      "mongoose.database()"
    ],
    answer: 0,
    explanation: "mongoose.connect() is used to establish a MongoDB connection."
  },

  {
    id: 25,
    level: "easy",
    topic: "Mongoose",
    question: "What is a Mongoose Schema?",
    options: [
      "A database server",
      "A structure defining document fields",
      "A React component",
      "An HTTP method"
    ],
    answer: 1,
    explanation: "A Mongoose Schema defines the structure and rules for documents."
  },

  {
    id: 26,
    level: "easy",
    topic: "Mongoose",
    question: "What is a Mongoose Model?",
    options: [
      "An interface for interacting with a MongoDB collection",
      "A CSS class",
      "An HTML page",
      "A Node.js server"
    ],
    answer: 0,
    explanation: "A Mongoose Model provides an interface for creating and querying documents in a collection."
  },

  {
    id: 27,
    level: "easy",
    topic: "React",
    question: "Which language is primarily used with React?",
    options: [
      "JavaScript",
      "SQL",
      "PHP",
      "C"
    ],
    answer: 0,
    explanation: "React is a JavaScript library."
  },

  {
    id: 28,
    level: "easy",
    topic: "React",
    question: "What is a React component?",
    options: [
      "A reusable UI building block",
      "A database",
      "An HTTP request",
      "A server"
    ],
    answer: 0,
    explanation: "React applications are built using reusable components."
  },

  {
    id: 29,
    level: "easy",
    topic: "React",
    question: "Which hook is commonly used to manage state?",
    options: [
      "useState",
      "useDatabase",
      "useServer",
      "useNode"
    ],
    answer: 0,
    explanation: "useState is a React Hook used to manage component state."
  },

  {
    id: 30,
    level: "easy",
    topic: "React",
    question: "Which hook is commonly used for side effects?",
    options: [
      "useEffect",
      "useSide",
      "useAction",
      "useServer"
    ],
    answer: 0,
    explanation: "useEffect is used to perform side effects in React components."
  },

  {
    id: 31,
    level: "easy",
    topic: "React",
    question: "What does JSX allow developers to write?",
    options: [
      "SQL inside MongoDB",
      "HTML-like syntax inside JavaScript",
      "CSS inside SQL",
      "MongoDB queries inside CSS"
    ],
    answer: 1,
    explanation: "JSX allows HTML-like syntax to be written within JavaScript."
  },

  {
    id: 32,
    level: "easy",
    topic: "React",
    question: "What are props in React?",
    options: [
      "Data passed from parent to child components",
      "Database records",
      "Server ports",
      "HTTP headers"
    ],
    answer: 0,
    explanation: "Props are used to pass data from a parent component to a child component."
  },

  {
    id: 33,
    level: "easy",
    topic: "Node.js",
    question: "Which object is commonly used to access environment variables in Node.js?",
    options: [
      "process.env",
      "node.env",
      "environment.node",
      "config.node"
    ],
    answer: 0,
    explanation: "Node.js provides environment variables through process.env."
  },

  {
    id: 34,
    level: "easy",
    topic: "Express.js",
    question: "Which middleware parses incoming JSON request bodies?",
    options: [
      "express.json()",
      "express.body()",
      "express.parse()",
      "express.data()"
    ],
    answer: 0,
    explanation: "express.json() parses incoming requests containing JSON payloads."
  },

  {
    id: 35,
    level: "easy",
    topic: "Express.js",
    question: "What is middleware in Express?",
    options: [
      "A function that has access to the request and response objects",
      "A database",
      "A React component",
      "A MongoDB collection"
    ],
    answer: 0,
    explanation: "Express middleware functions can access req, res, and next."
  },

  {
    id: 36,
    level: "easy",
    topic: "Express.js",
    question: "Which function is used to move to the next middleware?",
    options: [
      "next()",
      "continue()",
      "forward()",
      "move()"
    ],
    answer: 0,
    explanation: "The next() function passes control to the next middleware."
  },

  {
    id: 37,
    level: "easy",
    topic: "MongoDB",
    question: "Which MongoDB command displays available databases in mongosh?",
    options: [
      "show dbs",
      "list databases",
      "db.list()",
      "show databases()"
    ],
    answer: 0,
    explanation: "show dbs displays the databases available to the MongoDB shell."
  },

  {
    id: 38,
    level: "easy",
    topic: "MongoDB",
    question: "Which MongoDB method inserts one document?",
    options: [
      "insertOne()",
      "addOne()",
      "createOne()",
      "saveOne()"
    ],
    answer: 0,
    explanation: "insertOne() inserts a single document into a collection."
  },

  {
    id: 39,
    level: "easy",
    topic: "MongoDB",
    question: "Which MongoDB method retrieves multiple documents?",
    options: [
      "find()",
      "findAllData()",
      "getAll()",
      "select()"
    ],
    answer: 0,
    explanation: "find() is used to retrieve documents matching a query."
  },

  {
    id: 40,
    level: "easy",
    topic: "MongoDB",
    question: "Which MongoDB method removes one matching document?",
    options: [
      "deleteOne()",
      "removeAll()",
      "dropOne()",
      "erase()"
    ],
    answer: 0,
    explanation: "deleteOne() removes the first document that matches the filter."
  },


  // ============================================================
  // MEDIUM - 40 QUESTIONS
  // ============================================================

  {
    id: 41,
    level: "medium",
    topic: "MERN",
    question: "Which component of MERN is responsible for the user interface?",
    options: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js"
    ],
    answer: 2,
    explanation: "React is responsible for creating the frontend user interface."
  },

  {
    id: 42,
    level: "medium",
    topic: "MERN",
    question: "Which component of MERN is primarily responsible for server-side JavaScript execution?",
    options: [
      "React",
      "MongoDB",
      "Node.js",
      "CSS"
    ],
    answer: 2,
    explanation: "Node.js provides the runtime environment for executing JavaScript on the server."
  },

  {
    id: 43,
    level: "medium",
    topic: "MERN",
    question: "Which component of MERN manages application routes and middleware?",
    options: [
      "MongoDB",
      "Express.js",
      "React",
      "HTML"
    ],
    answer: 1,
    explanation: "Express.js provides routing and middleware functionality."
  },

  {
    id: 44,
    level: "medium",
    topic: "MERN",
    question: "Which component stores application data in the MERN stack?",
    options: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js"
    ],
    answer: 2,
    explanation: "MongoDB is the database component of the MERN stack."
  },

  {
    id: 45,
    level: "medium",
    topic: "Express.js",
    question: "What does req represent in Express middleware?",
    options: [
      "Response",
      "Request",
      "Router",
      "Result"
    ],
    answer: 1,
    explanation: "req represents the HTTP request object."
  },

  {
    id: 46,
    level: "medium",
    topic: "Express.js",
    question: "What does res represent in Express?",
    options: [
      "Request",
      "Response",
      "Resource",
      "Result"
    ],
    answer: 1,
    explanation: "res represents the HTTP response object."
  },

  {
    id: 47,
    level: "medium",
    topic: "Express.js",
    question: "Which method sends a JSON response from Express?",
    options: [
      "res.json()",
      "res.sendJSONOnly()",
      "res.object()",
      "res.data()"
    ],
    answer: 0,
    explanation: "res.json() sends a JSON response."
  },

  {
    id: 48,
    level: "medium",
    topic: "Express.js",
    question: "Which method can send a general HTTP response in Express?",
    options: [
      "res.send()",
      "res.output()",
      "res.writeData()",
      "res.return()"
    ],
    answer: 0,
    explanation: "res.send() is commonly used to send a response to the client."
  },

  {
    id: 49,
    level: "medium",
    topic: "Express.js",
    question: "What is the purpose of express.Router()?",
    options: [
      "To create modular route handlers",
      "To connect MongoDB",
      "To create React components",
      "To install packages"
    ],
    answer: 0,
    explanation: "express.Router() creates modular and mountable route handlers."
  },

  {
    id: 50,
    level: "medium",
    topic: "Express.js",
    question: "What does /users/:id represent in Express?",
    options: [
      "A query parameter",
      "A route parameter",
      "A request body",
      "A middleware name"
    ],
    answer: 1,
    explanation: ":id represents a route parameter."
  },

  {
    id: 51,
    level: "medium",
    topic: "Express.js",
    question: "How can the value of :id be accessed in Express?",
    options: [
      "req.params.id",
      "req.query.id",
      "req.body.id",
      "res.params.id"
    ],
    answer: 0,
    explanation: "Route parameters are accessed through req.params."
  },

  {
    id: 52,
    level: "medium",
    topic: "Express.js",
    question: "How can a query parameter such as ?name=Rex be accessed?",
    options: [
      "req.params.name",
      "req.query.name",
      "req.body.name",
      "res.query.name"
    ],
    answer: 1,
    explanation: "Query parameters are available through req.query."
  },

  {
    id: 53,
    level: "medium",
    topic: "REST API",
    question: "Which HTTP method is generally used to completely replace an existing resource?",
    options: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    answer: 2,
    explanation: "PUT is generally used to replace or completely update a resource."
  },

  {
    id: 54,
    level: "medium",
    topic: "REST API",
    question: "Which HTTP method is generally used for a partial update?",
    options: [
      "PATCH",
      "GET",
      "POST",
      "OPTIONS"
    ],
    answer: 0,
    explanation: "PATCH is commonly used for partial updates."
  },

  {
    id: 55,
    level: "medium",
    topic: "REST API",
    question: "Which status code is commonly returned after successfully creating a resource?",
    options: [
      "200",
      "201",
      "404",
      "500"
    ],
    answer: 1,
    explanation: "HTTP 201 Created indicates successful resource creation."
  },

  {
    id: 56,
    level: "medium",
    topic: "REST API",
    question: "Which status code indicates that authentication is required or has failed?",
    options: [
      "200",
      "201",
      "401",
      "404"
    ],
    answer: 2,
    explanation: "HTTP 401 indicates that valid authentication credentials are required."
  },

  {
    id: 57,
    level: "medium",
    topic: "REST API",
    question: "Which status code indicates that the server understood the request but refuses to authorize it?",
    options: [
      "201",
      "301",
      "403",
      "500"
    ],
    answer: 2,
    explanation: "HTTP 403 Forbidden indicates that access is not permitted."
  },

  {
    id: 58,
    level: "medium",
    topic: "MongoDB",
    question: "Which command switches to a MongoDB database?",
    options: [
      "use databaseName",
      "switch databaseName",
      "open databaseName",
      "select databaseName"
    ],
    answer: 0,
    explanation: "The use command switches the current database context."
  },

  {
    id: 59,
    level: "medium",
    topic: "MongoDB",
    question: "Which command displays collections in the current MongoDB database?",
    options: [
      "show collections",
      "list collections",
      "db.collections()",
      "show tables"
    ],
    answer: 0,
    explanation: "show collections lists collections in the current database."
  },

  {
    id: 60,
    level: "medium",
    topic: "MongoDB",
    question: "Which method inserts multiple documents?",
    options: [
      "insertMany()",
      "insertMultiple()",
      "addMany()",
      "createManyDocs()"
    ],
    answer: 0,
    explanation: "insertMany() inserts multiple documents into a collection."
  },

  {
    id: 61,
    level: "medium",
    topic: "MongoDB",
    question: "Which method retrieves a single matching document?",
    options: [
      "findOne()",
      "findSingle()",
      "getOne()",
      "selectOne()"
    ],
    answer: 0,
    explanation: "findOne() returns one document that matches the query."
  },

  {
    id: 62,
    level: "medium",
    topic: "MongoDB",
    question: "Which method updates one matching document?",
    options: [
      "updateOne()",
      "changeOne()",
      "modifyOneOnly()",
      "editOne()"
    ],
    answer: 0,
    explanation: "updateOne() updates the first document matching the filter."
  },

  {
    id: 63,
    level: "medium",
    topic: "MongoDB",
    question: "Which operator is commonly used to modify a field value in MongoDB?",
    options: [
      "$set",
      "$change",
      "$modify",
      "$field"
    ],
    answer: 0,
    explanation: "$set is used to assign a value to a field."
  },

  {
    id: 64,
    level: "medium",
    topic: "MongoDB",
    question: "Which operator is commonly used to increment a numeric field?",
    options: [
      "$increase",
      "$inc",
      "$addNumber",
      "$increment"
    ],
    answer: 1,
    explanation: "$inc increments a numeric field by a specified amount."
  },

  {
    id: 65,
    level: "medium",
    topic: "MongoDB",
    question: "Which command removes the current database?",
    options: [
      "db.removeDatabase()",
      "db.dropDatabase()",
      "db.deleteDatabase()",
      "db.eraseDatabase()"
    ],
    answer: 1,
    explanation: "db.dropDatabase() removes the current database."
  },

  {
    id: 66,
    level: "medium",
    topic: "Mongoose",
    question: "What is the relationship between a Schema and Model in Mongoose?",
    options: [
      "A Model is created using a Schema",
      "A Schema is created using a Model",
      "They are unrelated",
      "Both are databases"
    ],
    answer: 0,
    explanation: "A Mongoose Model is normally created from a Schema."
  },

  {
    id: 67,
    level: "medium",
    topic: "Mongoose",
    question: "Which method can save a Mongoose document?",
    options: [
      "save()",
      "store()",
      "insertDocument()",
      "commit()"
    ],
    answer: 0,
    explanation: "The save() method saves a Mongoose document."
  },

  {
    id: 68,
    level: "medium",
    topic: "Mongoose",
    question: "Which method is commonly used to retrieve multiple documents using Mongoose?",
    options: [
      "Model.find()",
      "Model.getAll()",
      "Model.selectAll()",
      "Model.retrieve()"
    ],
    answer: 0,
    explanation: "Model.find() retrieves documents matching a condition."
  },

  {
    id: 69,
    level: "medium",
    topic: "Mongoose",
    question: "What does the required option in a Mongoose Schema do?",
    options: [
      "Makes a field mandatory",
      "Deletes the field",
      "Encrypts the field",
      "Indexes every field"
    ],
    answer: 0,
    explanation: "required: true makes a field mandatory during validation."
  },

  {
    id: 70,
    level: "medium",
    topic: "Mongoose",
    question: "Which Mongoose type is suitable for storing a person's name?",
    options: [
      "String",
      "Boolean",
      "Number",
      "Date only"
    ],
    answer: 0,
    explanation: "String is appropriate for text such as a person's name."
  },

  {
    id: 71,
    level: "medium",
    topic: "React",
    question: "What happens when a React state value is updated using its setter?",
    options: [
      "The component can re-render",
      "The browser closes",
      "MongoDB is deleted",
      "Node.js stops"
    ],
    answer: 0,
    explanation: "Updating state schedules a re-render of the component."
  },

  {
    id: 72,
    level: "medium",
    topic: "React",
    question: "Why is the key prop used when rendering a list in React?",
    options: [
      "To help React identify list elements",
      "To connect MongoDB",
      "To create CSS",
      "To send HTTP requests"
    ],
    answer: 0,
    explanation: "Keys help React identify which list elements have changed."
  },

  {
    id: 73,
    level: "medium",
    topic: "React",
    question: "Which syntax is commonly used to render an array of items in React?",
    options: [
      "array.map()",
      "array.render()",
      "array.display()",
      "array.show()"
    ],
    answer: 0,
    explanation: "The map() method is commonly used to transform arrays into JSX elements."
  },

  {
    id: 74,
    level: "medium",
    topic: "React",
    question: "What is the purpose of useEffect in a React component?",
    options: [
      "Perform side effects",
      "Create a MongoDB database",
      "Start an Express server",
      "Compile CSS"
    ],
    answer: 0,
    explanation: "useEffect is used for side effects such as API calls and subscriptions."
  },

  {
    id: 75,
    level: "medium",
    topic: "React",
    question: "What is conditional rendering?",
    options: [
      "Displaying UI based on a condition",
      "Creating a database",
      "Running Node.js",
      "Deleting components"
    ],
    answer: 0,
    explanation: "Conditional rendering displays different UI depending on application state or conditions."
  },

  {
    id: 76,
    level: "medium",
    topic: "React",
    question: "What is a controlled form input in React?",
    options: [
      "An input whose value is controlled by React state",
      "An input controlled only by MongoDB",
      "An input controlled by CSS",
      "An input without a value"
    ],
    answer: 0,
    explanation: "A controlled input gets its value from React state and updates it through event handlers."
  },

  {
    id: 77,
    level: "medium",
    topic: "Node.js",
    question: "Which command installs Express in a Node.js project?",
    options: [
      "npm install express",
      "node install express",
      "npm express install",
      "install-node express"
    ],
    answer: 0,
    explanation: "npm install express installs Express as a project dependency."
  },

  {
    id: 78,
    level: "medium",
    topic: "Node.js",
    question: "What is the purpose of package-lock.json?",
    options: [
      "It records exact dependency versions",
      "It stores MongoDB documents",
      "It contains CSS",
      "It stores React components"
    ],
    answer: 0,
    explanation: "package-lock.json records the dependency tree and resolved versions."
  },

  {
    id: 79,
    level: "medium",
    topic: "Node.js",
    question: "What does npm install generally do when package.json exists?",
    options: [
      "Installs project dependencies",
      "Deletes dependencies",
      "Creates MongoDB collections",
      "Starts React automatically"
    ],
    answer: 0,
    explanation: "npm install installs dependencies specified in package.json."
  },

  {
    id: 80,
    level: "medium",
    topic: "MERN",
    question: "What is the typical data flow in a MERN application?",
    options: [
      "React → Express/Node → MongoDB → Express/Node → React",
      "MongoDB → CSS → React",
      "React → CSS → MongoDB only",
      "Node → HTML → MongoDB only"
    ],
    answer: 0,
    explanation: "The frontend communicates with the backend, which communicates with MongoDB and sends data back to the frontend."
  },


  // ============================================================
  // HARD - 40 QUESTIONS
  // ============================================================

  {
    id: 81,
    level: "hard",
    topic: "MERN Architecture",
    question: "Why is Express commonly used between React and Node.js in a MERN application?",
    options: [
      "It provides routing and middleware for the backend",
      "It replaces MongoDB",
      "It renders CSS",
      "It replaces JavaScript"
    ],
    answer: 0,
    explanation: "Express provides backend routing, middleware, request handling, and response handling on top of Node.js."
  },

  {
    id: 82,
    level: "hard",
    topic: "MERN Architecture",
    question: "Which layer is primarily responsible for persistent data storage in MERN?",
    options: [
      "React",
      "Express",
      "MongoDB",
      "Node.js"
    ],
    answer: 2,
    explanation: "MongoDB provides persistent data storage."
  },

  {
    id: 83,
    level: "hard",
    topic: "REST API",
    question: "A client sends POST /api/students with JSON data. Which Express property normally contains the parsed JSON body?",
    options: [
      "req.params",
      "req.query",
      "req.body",
      "req.headers"
    ],
    answer: 2,
    explanation: "After JSON parsing middleware is enabled, request data is available through req.body."
  },

  {
    id: 84,
    level: "hard",
    topic: "Express.js",
    question: "What happens if Express middleware neither sends a response nor calls next()?",
    options: [
      "The request may remain pending",
      "The server automatically sends 200",
      "MongoDB closes",
      "React reloads"
    ],
    answer: 0,
    explanation: "Middleware must either complete the response or pass control using next(); otherwise the request can remain pending."
  },

  {
    id: 85,
    level: "hard",
    topic: "Express.js",
    question: "Which middleware signature identifies Express error-handling middleware?",
    options: [
      "(req, res)",
      "(req, res, next)",
      "(err, req, res, next)",
      "(error)"
    ],
    answer: 2,
    explanation: "Express error-handling middleware uses four parameters: err, req, res, next."
  },

  {
    id: 86,
    level: "hard",
    topic: "Express.js",
    question: "Why should error-handling middleware generally be defined after other routes and middleware?",
    options: [
      "It handles errors passed down the middleware chain",
      "It creates the database",
      "It initializes React",
      "It installs npm packages"
    ],
    answer: 0,
    explanation: "Error middleware is normally placed after application routes so errors can propagate to it."
  },

  {
    id: 87,
    level: "hard",
    topic: "Express.js",
    question: "Which expression correctly mounts a router at /api/users?",
    options: [
      "app.use('/api/users', userRouter)",
      "app.router('/api/users', userRouter)",
      "app.mount('/api/users')",
      "router.useApp('/api/users')"
    ],
    answer: 0,
    explanation: "app.use() mounts an Express Router at a specified path."
  },

  {
    id: 88,
    level: "hard",
    topic: "Express.js",
    question: "For the route /users/:id, what is req.params.id when the URL is /users/25?",
    options: [
      "25",
      ":id",
      "users",
      "undefined"
    ],
    answer: 0,
    explanation: "The route parameter id receives the value 25."
  },

  {
    id: 89,
    level: "hard",
    topic: "REST API",
    question: "Which design best represents a RESTful endpoint for retrieving one student with ID 10?",
    options: [
      "GET /students/10",
      "POST /getStudent/10",
      "GET /getStudent?id=10 only",
      "POST /students/delete/10"
    ],
    answer: 0,
    explanation: "GET /students/10 represents retrieval of the student resource identified by 10."
  },

  {
    id: 90,
    level: "hard",
    topic: "REST API",
    question: "Which endpoint is most appropriate for deleting student 10?",
    options: [
      "GET /students/delete/10",
      "DELETE /students/10",
      "POST /students/10/delete",
      "PATCH /students/10"
    ],
    answer: 1,
    explanation: "DELETE /students/10 follows the conventional REST pattern for deleting a student resource."
  },

  {
    id: 91,
    level: "hard",
    topic: "REST API",
    question: "Which status code is most appropriate when a requested resource does not exist?",
    options: [
      "200",
      "201",
      "404",
      "500"
    ],
    answer: 2,
    explanation: "404 Not Found indicates that the requested resource could not be found."
  },

  {
    id: 92,
    level: "hard",
    topic: "REST API",
    question: "Which status code is most appropriate when a request creates a new resource successfully?",
    options: [
      "200",
      "201",
      "204",
      "404"
    ],
    answer: 1,
    explanation: "201 Created is the conventional response for successful resource creation."
  },

  {
    id: 93,
    level: "hard",
    topic: "MongoDB",
    question: "What is the primary difference between find() and findOne()?",
    options: [
      "find() can return multiple documents, while findOne() returns one",
      "find() updates documents",
      "findOne() deletes documents",
      "There is no difference"
    ],
    answer: 0,
    explanation: "find() returns a cursor for matching documents, while findOne() returns one matching document."
  },

  {
    id: 94,
    level: "hard",
    topic: "MongoDB",
    question: "Which MongoDB operation is appropriate for changing only the name field of a document?",
    options: [
      "updateOne() with $set",
      "deleteOne()",
      "findOne() only",
      "insertOne()"
    ],
    answer: 0,
    explanation: "updateOne() with $set changes only the specified field."
  },

  {
    id: 95,
    level: "hard",
    topic: "MongoDB",
    question: "What is the purpose of the $set operator?",
    options: [
      "Assign a value to a field",
      "Delete a collection",
      "Increment a number only",
      "Find a document"
    ],
    answer: 0,
    explanation: "$set assigns a new value to a specified field."
  },

  {
    id: 96,
    level: "hard",
    topic: "MongoDB",
    question: "What does the following operation do: db.students.updateOne({name:'Rex'}, {$inc:{marks:5}})?",
    options: [
      "Sets marks to 5",
      "Increases marks by 5",
      "Deletes marks",
      "Creates five students"
    ],
    answer: 1,
    explanation: "$inc increases the existing numeric marks value by 5."
  },

  {
    id: 97,
    level: "hard",
    topic: "MongoDB",
    question: "Which MongoDB method is appropriate when multiple matching documents need to be updated?",
    options: [
      "updateMany()",
      "updateOne()",
      "modifyOne()",
      "changeAllDocuments()"
    ],
    answer: 0,
    explanation: "updateMany() updates all documents matching the specified filter."
  },

  {
    id: 98,
    level: "hard",
    topic: "MongoDB",
    question: "What does deleteMany() do?",
    options: [
      "Deletes all documents matching a filter",
      "Deletes the database automatically",
      "Deletes one document only",
      "Deletes MongoDB itself"
    ],
    answer: 0,
    explanation: "deleteMany() removes all documents matching the specified filter."
  },

  {
    id: 99,
    level: "hard",
    topic: "MongoDB",
    question: "What is the purpose of ObjectId in MongoDB?",
    options: [
      "It is commonly used as a unique identifier for documents",
      "It stores passwords",
      "It represents an Express route",
      "It is a CSS property"
    ],
    answer: 0,
    explanation: "ObjectId is commonly used as the unique _id value for MongoDB documents."
  },

  {
    id: 100,
    level: "hard",
    topic: "Mongoose",
    question: "Why is Mongoose Schema validation useful?",
    options: [
      "It helps enforce expected document structure and field rules",
      "It replaces React",
      "It creates CSS",
      "It starts the operating system"
    ],
    answer: 0,
    explanation: "Schema validation helps ensure that documents follow expected field types and rules."
  },

  {
    id: 101,
    level: "hard",
    topic: "Mongoose",
    question: "Which Mongoose definition correctly describes a required String field?",
    options: [
      "name: { type: String, required: true }",
      "name: String.required",
      "name: { required: String }",
      "name: { String: required }"
    ],
    answer: 0,
    explanation: "Mongoose uses type: String and required: true to define a required string field."
  },

  {
    id: 102,
    level: "hard",
    topic: "Mongoose",
    question: "What happens when a Mongoose document violates a Schema validation rule?",
    options: [
      "Validation can fail and produce an error",
      "MongoDB automatically accepts it",
      "React fixes it",
      "Express deletes the database"
    ],
    answer: 0,
    explanation: "Mongoose performs validation and can return a validation error when rules are violated."
  },

  {
    id: 103,
    level: "hard",
    topic: "Mongoose",
    question: "Which operation is commonly used to retrieve a document by its MongoDB ID?",
    options: [
      "findById()",
      "getByMongoId()",
      "selectByObject()",
      "findMongoDocument()"
    ],
    answer: 0,
    explanation: "Mongoose provides findById() for retrieving a document by its _id."
  },

  {
    id: 104,
    level: "hard",
    topic: "Mongoose",
    question: "What is the main advantage of using Mongoose Models?",
    options: [
      "They provide structured methods for interacting with MongoDB collections",
      "They replace Node.js",
      "They create browser windows",
      "They replace HTTP"
    ],
    answer: 0,
    explanation: "Mongoose Models provide methods for creating, reading, updating, and deleting MongoDB documents."
  },

  {
    id: 105,
    level: "hard",
    topic: "React",
    question: "Why should React state generally be updated using the setter returned by useState?",
    options: [
      "It allows React to schedule a component update",
      "It directly modifies MongoDB",
      "It starts Express",
      "It changes CSS files permanently"
    ],
    answer: 0,
    explanation: "The state setter informs React that state has changed and allows React to update the UI."
  },

  {
    id: 106,
    level: "hard",
    topic: "React",
    question: "What is the main purpose of the dependency array in useEffect?",
    options: [
      "It controls when the effect is re-executed",
      "It creates a MongoDB collection",
      "It defines CSS",
      "It installs packages"
    ],
    answer: 0,
    explanation: "The dependency array determines when React should re-run the effect."
  },

  {
    id: 107,
    level: "hard",
    topic: "React",
    question: "What does an empty dependency array [] in useEffect generally indicate?",
    options: [
      "The effect runs after the initial render and does not re-run due to state/prop dependencies",
      "The effect runs every millisecond",
      "The effect never runs",
      "The effect deletes the component"
    ],
    answer: 0,
    explanation: "An empty dependency array means the effect has no declared reactive dependencies and normally runs after the initial render."
  },

  {
    id: 108,
    level: "hard",
    topic: "React",
    question: "Why are React list keys expected to be stable and unique among siblings?",
    options: [
      "They help React correctly track list elements between renders",
      "They encrypt the list",
      "They connect to MongoDB",
      "They create API endpoints"
    ],
    answer: 0,
    explanation: "Stable keys allow React to correctly identify elements when a list changes."
  },

  {
    id: 109,
    level: "hard",
    topic: "React",
    question: "What is the main difference between props and state?",
    options: [
      "Props are passed into a component, while state is managed by the component",
      "Props are databases and state is CSS",
      "Props belong only to Node.js",
      "There is no difference"
    ],
    answer: 0,
    explanation: "Props are inputs passed to components, while state represents data managed within a component."
  },

  {
    id: 110,
    level: "hard",
    topic: "React",
    question: "Why should React state not normally be mutated directly?",
    options: [
      "Direct mutation may not properly trigger React's rendering process",
      "MongoDB will stop",
      "Express will crash",
      "JavaScript does not support objects"
    ],
    answer: 0,
    explanation: "Using state setters gives React the information needed to schedule UI updates."
  },

  {
    id: 111,
    level: "hard",
    topic: "Node.js",
    question: "What is the event-driven nature of Node.js useful for?",
    options: [
      "Handling many I/O operations efficiently",
      "Creating relational tables automatically",
      "Rendering CSS",
      "Replacing MongoDB"
    ],
    answer: 0,
    explanation: "Node.js uses an event-driven architecture that is well suited to I/O-heavy applications."
  },

  {
    id: 112,
    level: "hard",
    topic: "Node.js",
    question: "Why is asynchronous programming important in Node.js?",
    options: [
      "It allows I/O operations without unnecessarily blocking the main execution flow",
      "It makes MongoDB relational",
      "It removes JavaScript",
      "It prevents all errors"
    ],
    answer: 0,
    explanation: "Asynchronous operations allow Node.js to continue handling other work while waiting for I/O."
  },

  {
    id: 113,
    level: "hard",
    topic: "Node.js",
    question: "What is the purpose of async/await when working with database operations?",
    options: [
      "It provides a clearer way to work with Promises",
      "It converts MongoDB to SQL",
      "It creates React components",
      "It removes asynchronous behavior"
    ],
    answer: 0,
    explanation: "async/await provides a more readable syntax for working with Promise-based asynchronous operations."
  },

  {
    id: 114,
    level: "hard",
    topic: "Node.js",
    question: "What happens when an awaited Promise rejects and there is no handling around it?",
    options: [
      "The async operation can result in an error that must be handled appropriately",
      "The database automatically fixes the error",
      "React automatically retries it",
      "Express converts it to success"
    ],
    answer: 0,
    explanation: "Rejected Promises should be handled using appropriate error-handling mechanisms such as try/catch."
  },

  {
    id: 115,
    level: "hard",
    topic: "MERN",
    question: "Which sequence best represents a typical MERN CRUD request?",
    options: [
      "React → Express route → controller/business logic → MongoDB → response → React",
      "MongoDB → CSS → React → database",
      "React → CSS → MongoDB directly in every application",
      "Express → HTML → CSS → MongoDB"
    ],
    answer: 0,
    explanation: "A typical MERN application sends requests from React to the Express/Node backend, which interacts with MongoDB and returns a response."
  },

  {
    id: 116,
    level: "hard",
    topic: "MERN",
    question: "Why should database credentials normally not be hard-coded into frontend React code?",
    options: [
      "Frontend code is exposed to users and secrets could be compromised",
      "React cannot use strings",
      "MongoDB does not support passwords",
      "Express requires CSS"
    ],
    answer: 0,
    explanation: "Frontend code is delivered to users, so sensitive database credentials should be kept on the server."
  },

  {
    id: 117,
    level: "hard",
    topic: "MERN",
    question: "Where should sensitive environment variables such as database connection strings normally be stored?",
    options: [
      "Server-side environment configuration",
      "React JSX visible to users",
      "CSS files",
      "Public HTML"
    ],
    answer: 0,
    explanation: "Sensitive configuration should be kept on the server and supplied through environment variables or secure configuration."
  },

  {
    id: 118,
    level: "hard",
    topic: "MERN",
    question: "A React application receives a 500 response from an API. What does this generally indicate?",
    options: [
      "A server-side error occurred",
      "The request was always successful",
      "The database must be empty",
      "The browser has no CSS"
    ],
    answer: 0,
    explanation: "HTTP 500 indicates an internal server-side error."
  },

  {
    id: 119,
    level: "hard",
    topic: "MERN",
    question: "A React frontend sends JSON to Express, but req.body is undefined. What is the most likely missing configuration?",
    options: [
      "app.use(express.json())",
      "app.use(express.css())",
      "mongoose.react()",
      "React.useJSON()"
    ],
    answer: 0,
    explanation: "Express needs JSON body-parsing middleware such as app.use(express.json()) to parse incoming JSON."
  },

  {
    id: 120,
    level: "hard",
    topic: "MERN",
    question: "What is the best reason for separating React frontend and Express backend in a MERN application?",
    options: [
      "It separates presentation from server-side/API responsibilities",
      "It prevents JavaScript from running",
      "It eliminates the need for a database",
      "It makes HTTP unnecessary"
    ],
    answer: 0,
    explanation: "Separating frontend and backend provides a clear architecture where React handles the UI and the Express/Node backend handles APIs and server-side logic."
  }

];

export default initialQuestions;
