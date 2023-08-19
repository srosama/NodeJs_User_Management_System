// GET / 
// dashboard


exports.dashboard = async (req, res) => {
    const locals = {
        title:"User management system",
    }
    res.render('index', locals)
}
