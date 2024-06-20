type ProjectType = 'software' | 'report'
export type Project = {
  id: number
  type: ProjectType
  sortOrder: number
  published: string
  slug: string
  title: string
  description: string
  image: string
  link: string
  repo: string
  rational: string
  stack: {
    tech: string
    explanation?: string
  }[]
  deployment: {
    tech: string
    explanation?: string
  }[]
}

export type Projects = Project[]

const projectList: Projects = [
  {
    id: 1,
    type: 'software',
    sortOrder: 1,
    published: '2023-05-01',
    slug: 'positive-press',
    title: 'Positive Press (Frontend)',
    description:
      'My BSc Final Year Project. I created a web app that uses Natural Language Processing (NLP) to analyse news headlines and provide a curated feed of news ranked by positivity. This is the consuming frontend responsive app, built in NextJs.',
    image: 'positive-press.png',
    link: 'https://positive-press.vercel.app/',
    repo: 'https://www.github.com/tj2904/postive-press',
    rational:
      'There is a growing body of evidence that negative news can have a detrimental effect on mental health. This site was created to provide a curated feed of news that is ranked by positivity. The project uses Natural Language Processing (NLP) to analyse news headlines and provide a curated feed of news ranked by positivity. The app uses a FastAPI backend to provide the API for the frontend to consume. The project also uses a PostgreSQL database to store the news headlines and their associated sentiment scores. Sentry is used for error tracking and Swagger for API documentation. The frontend is built using NextJS and TailwindCSS and the project is deployed on Vercel.',
    stack: [
      { tech: 'NextJS' },
      { tech: 'TypeScript' },
      { tech: 'Python', explanation: ' - Used for the backend API' },
      {
        tech: 'PostgreSQL',
        explanation: ' - Used for backend database',
      },
      { tech: 'FastAPI' },
      { tech: 'Swagger', explanation: ' - Used for API documentation' },
      { tech: 'TailwindCSS' },
    ],
    deployment: [
      { tech: 'Vercel' },
      {
        tech: 'Heroku',
        explanation: ' - Used for backend storage and API provision',
      },
      { tech: 'Sentry' },
    ],
  },
  {
    id: 2,
    type: 'software',
    sortOrder: 2,
    published: '2023-05-01',
    slug: 'pp-api',
    title: 'Positive Press (Backend & API Service)',
    description:
      'My BSc Final Year Project. I created a Python API that uses Natural Language Processing (NLP) to analyse news headlines and provide a curated feed of news ranked by positivity. This is served by the backend app using FastAPI, and the documentation of the endpoints found at the link below is provided using Swagger. There is a consuming frontend app, built in NextJS.',
    image: 'pp-api.png',
    link: 'https://positive-press-api.herokuapp.com/docs/',
    repo: 'https://www.github.com/tj2904/pp-api',
    rational:
      'There is a growing body of evidence that negative news can have a detrimental effect on mental health. This site was created to provide a curated feed of news that is ranked by positivity. The project uses Natural Language Processing (NLP) to analyse news headlines and provide a curated feed of news ranked by positivity. The app uses a FastAPI backend to provide the API for the frontend to consume. The project also uses a PostgreSQL database to store the news headlines and their associated sentiment scores. Sentry is used for error tracking and Swagger for API documentation. The frontend is built using NextJS and TailwindCSS and the project is deployed on Vercel.',
    stack: [
      { tech: 'Python' },
      {
        tech: 'PostgreSQL',
      },
      { tech: 'FastAPI' },
      { tech: 'Swagger', explanation: ' - Used for API documentation' },
    ],
    deployment: [
      {
        tech: 'Heroku',
        explanation:
          ' - Hosts PostgreSQL and the Python app that provides the API endpoints.',
      },
      { tech: 'Sentry' },
    ],
  },
  {
    id: 2,
    type: 'software',
    sortOrder: 20,
    published: '2023-01-22',
    slug: 'kitchen-helper',
    title: 'Kitchen Helper',
    description:
      'Quickly convert the units of measurement from one to another, or take a recipe from a website and convert the units of measurement in it.',
    image: 'kitchen-helper.png',
    link: 'https://kitchen-helper.onrender.app/',
    repo: 'https://www.github.com/tj2904/kitchen-helper',
    rational:
      'When using cookbooks from other countries the units of measurement can be unfamiliar. This site was created to help people who struggle to convert the units of measurement in a recipe from a cookbook. The app will also take the url of a recipe online and provide measurement conversions for the ingredients in it.',
    stack: [
      { tech: 'React' },
      { tech: 'JavaScript' },
      {
        tech: 'Spoonacular',
        explanation: ' - Used for data provision',
      },
    ],
    deployment: [{ tech: 'Render' }, { tech: 'Sentry' }],
  },
  {
    id: 3,
    type: 'software',
    sortOrder: 21,
    published: '2023-08-12',
    slug: 'simple-nutrition',
    title: 'Simple Nutrition',
    description:
      "This site, created for a friend, takes an ingredient as input an returns a list of nutritional values that can be saved in combinations to create meals. This was to support a young mother monitor her child's intake.",
    image: 'simple-nutrition.png',
    link: 'https://simple-nutrition.vercel.app/',
    repo: 'https://www.github.com/tj2904/simple-nutrition',
    rational:
      'Keeping an eye on what your child eats is important, and as a new mother with everything else on her mind a friend wanted to be able to quickly check on which of the vital nutrients her daughter had consumed, or more importantly, not consumed that day so that she could adapt her meal plans accordingly. ',
    stack: [
      { tech: 'NextJS' },
      { tech: 'TypeScript' },
      {
        tech: 'Vercel',
        explanation: ' - Used for backend storage provision',
      },
      {
        tech: 'PostgreSQL',
        explanation: ' - Used for backend database',
      },
      { tech: 'Prisma' },
      {
        tech: 'Spoonacular',
        explanation: ' - Used for data provision',
      },
    ],
    deployment: [{ tech: 'Vercel' }, { tech: 'Sentry' }],
  },
  {
    id: 4,
    type: 'report',
    sortOrder: 10,
    published: '2023-12-22',
    slug: 'challenges-of-unstructured-data',
    title: 'The Challenges of Unstructured Data',
    description:
      'A Report written during my studies for an MSc in Data Science.',
    image: '',
    link: '/assets/The Challenges of Statistical Analysis and Unstructured Data.pdf',
    repo: '',
    rational:
      'Unstructured data is now accounting for up to 80% of all data held by organisations. Currently, processing this data is time-consuming and complex, as traditional analysis methods are designed to be deployed against structured data. However, unstructured data hold the potential to answer many questions. In this paper the use of Machine Learning, including Deep Learning, and NLP, focusing on word embeddings and the use of word2vec and BERT with unstructured datasets is reviewed, with focus on medical and financial unstructured data. The paper summarises the state of the art and outlines the open research questions of privacy, quality and availability of datasets and generalisability of study outcomes that face the field, highlighting where they exist, some solutions to these questions that have been proposed in the literature.',
    stack: [],
    deployment: [],
  },

  {
    id: 5,
    type: 'software',
    sortOrder: 9,
    published: '2023-11-30',
    slug: 'iris-classification',
    title: 'Iris Classification with Lime Explainability',
    description:
      'Using the Iris dataset and two algorithms, k-means clustering and logistic regression this project sets out to use the algorithms to classify the three species of iris contained within the dataset. The project builds a k-means cluster classifier, finding that k=3 is the optimal value for k, and a logistic regression model that provides 98% accuracy. The project also reports on the use of Lime to explain how the regression model made the classification decision.',
    image: 'iris-k-means.png',
    link: '',
    repo: 'https://github.com/tj2904/iris-classification-with-lime',
    rational: '',
    stack: [
      { tech: 'Python' },
      { tech: 'Jupyter' },
      { tech: 'Pandas' },
      { tech: 'Numpy' },
      { tech: 'SciKitLearn' },
    ],
    deployment: [],
  },

  {
    id: 6,
    type: 'software',
    sortOrder: 8,
    published: '2024-04-26',
    slug: 'lfb-callout-analysis',
    title: 'London Fire Brigade Callout Analysis',
    description:
      'This report details the start of a project that uses London Fire Brigade callout data for the London Borough of Hounslow to develop an understanding of trends and pose and answer relevant business questions by using data mining techniques.',
    image: 'lfb-map.png',
    link: '',
    repo: 'https://github.com/tj2904/lfb-callout-analysis',
    rational: '',
    stack: [
      { tech: 'Python' },
      { tech: 'Jupyter' },
      { tech: 'Pandas' },
      { tech: 'Numpy' },
      { tech: 'SciKitLearn' },
      { tech: 'GeoPandas' },
      { tech: 'Tableau' },
    ],
    deployment: [],
  },
  // {
  //   id: ,
  //   type: '',
  //   sortOrder: ,
  //   published: '',
  //   slug: '',
  //   title: '',
  //   description: '',
  //   image: '',
  //   link: '',
  //   repo: '',
  //   rational: '',
  //   stack: [],
  //   deployment: [],
  // },
]

export default projectList
