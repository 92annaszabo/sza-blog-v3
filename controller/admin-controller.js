class AdminController {
    getAdminView(req,res){
        res.render('dashboard-view', {
            title: "Anna's blog"
        })
    }
}
module.exports = AdminController