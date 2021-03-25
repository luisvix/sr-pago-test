const {commonInfo} = require("./commonInfo")

const movies = ({title, categories, imageUrl, city, movieId, ...others}) => ({
  ...commonInfo({...others, id: movieId}),
  title,
  categories,
  imageUrl,
  city
})

module.exports = {moviesModel: movies}
