let User=require('../models/user');
let Portfolio=require('../models/portfolio');
var sessionUser;

let Ctrl = {

     login:function(req, res){
       console.log(req.body.username);
      User.findOne({username: req.body.username} ,function(err,user){
      if(!user){ res.render('home', {flag:true, login: false});}
      else if(user){
        var validPassword = user.comparePassword(req.body.password);
        if(validPassword){
      req.session.user=user;
      Portfolio.findOne({username: req.body.username}, function(err,portfolio){
        if(!portfolio){
          res.render('uploadPP',{flag:false});
        } else{
          Portfolio.findOne({username: req.body.username},function(err,profile){
          req.session.portfolio=profile;
          res.redirect('/accountView');
          })
        }
      })
    }
    else{res.render('home', {flag:true, login: false});}}
    })
  },

     home:function(req,res){
       res.render('home',{flag:false, login: false});
     },

     signup: function(req,res){
       res.render('signup',{flag:false, user:false})
     },

     register: function(req,res){
       if(req.body.username==undefined || req.body.username=="" || req.body.email==undefined || req.body.email=="" || req.body.password==undefined || req.body.password==""){
         res.render('signup',{flag:true, user:false})
       }else{
       var user = new User(req.body);
       user.save(function(err, user){
           if(err){
               res.render('signup',{flag:false, user: true})
           }
           else{
               console.log(user);
               res.render('home',{flag: false, login: true});
           }
         })
     }},

     uploadpp:function(req,res){
       if(req.file==undefined){
       res.render('uploadPP' ,{flag:true});}
     var profile= new Portfolio();
     profile.username=req.session.user.username;
     profile.img=req.file.originalname;
     req.session.portfolio=profile;
     console.log(req.session.portfolio);
     res.render('uploadWork',{flag:false});
   },

    skipPP: function(req,res){
      var profile= new Portfolio();
      profile.username=req.session.user.username;
      req.session.portfolio=profile;
      console.log(req.session.portfolio);
      res.render('uploadWork',{flag:false});
    },

    uploadSnap: function(req,res){
      if(req.file==undefined){
        res.render('uploadWork',{flag:true})
      }
      var work={flag:1, url: req.file.originalname};
      req.session.portfolio.works.push(work);
      console.log(req.session.portfolio);
      res.render('uploadWork',{flag:false});
    },

    uploadUrl:function(req,res){
      if(req.body.myfile==undefined || req.body.myfile==""){
          res.render('uploadWork',{flag:true});
      }
      var work={flag:0, url: req.body.myfile};
      req.session.portfolio.works.push(work);
      console.log(req.session.portfolio);
      res.render('uploadWork',{flag:false});
    },

    submit:function(req,res){
      if(req.session.portfolio.works.length==0){
        res.render('uploadWork',{flag:true})
      }
      var portfolio= new Portfolio(req.session.portfolio);
      portfolio.save(function(err){
          if(err){
              res.send(err.message);
              console.log(err);
          }
          else{
              req.session.message="Your portofolio has been submitted";
              res.redirect('/accountView');
          }
        })
    },
    views:function(req,res){
      Portfolio.find({},function(err,Portfolio){
        res.render('views',{portfolio: Portfolio});
      })
    },

    accountView:function(req,res){
       res.render('accountView', {portfolio: req.session.portfolio, flag: false , message:req.session.message})
    },

    accountViewf:function(req,res){
       res.render('accountView', {portfolio: req.session.portfolio, flag: true , message:req.session.message})
    },

    updateSnap: function(req,res){
      if(req.file==undefined){
        req.session.message=undefined;
        res.redirect('/accountViewf');
      }else{
      console.log("adding snap");
      Portfolio.findOne({username:req.session.user.username}, function(err,profile){
        if(err){
          res.send(err);
        }
        var work={flag:1, url: req.file.originalname};
        profile.works.push(work);
        profile.save(function(err){
            if(err){
                res.send(err.message);
                console.log(err);
            }
            else{
                req.session.message="Your portofolio has been submitted";
                req.session.portfolio=profile;
                res.redirect('/accountView');
            }
          })
      })}
    },

    updateUrl: function(req,res){
      console.log("adding URL");
      if(req.body.myfile==undefined || req.body.myfile==""){
            req.session.message=undefined;
            res.redirect('/accountViewf');
      }else{
      Portfolio.findOne({username:req.session.user.username}, function(err,profile){
        if(err){
          res.send(err);
        }
        var work={flag:0, url: req.body.myfile};
        profile.works.push(work);
        profile.save(function(err){
            if(err){
                res.send(err.message);
                console.log(err);
            }
            else{
                req.session.message="Your portofolio has been submitted";
                req.session.portfolio=profile;
                res.redirect('/accountView');
            }
          })
      })}
    }


   }

module.exports = Ctrl;
