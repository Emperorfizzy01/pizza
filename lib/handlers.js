/*
* Request handlers
*
*/



// Dependencies
const config  = require("./config");
const _data = require("./data");
const helpers = require("./helpers");

//Define the handler
var handlers = {};

// Create account
handlers.accountCreate = function(data,callback) {
    // Reject any request that isnt GET request
    if(data.method == 'get') {
       
        // Prepare data for interpolation
        var templateData = {
            'head.title': 'Create an Account',
            'head.description': 'Signup is easy and only takes a few seconds',
            'body.class': 'accountCreate'
        }
         // Read in a template as a string
      helpers.getTemplate('accountCreate',templateData,function(err,str) {
          if(!err && str) {
              // Add the universal header and footer
              helpers.addUniversalTemplates(str,templateData,function(err,str) {
                  if(!err && str) {
                     // Return the page as HTML
                     callback(200,str,'html');
                  } else {
                      callback(500,undefined,'html');
                  }
              })
          } else {
              callback(500,undefined,'html');
          }
      })
    } else {
        callback(405,undefined,'html')
     }
    };

// Create a New Session
handlers.sessionCreate = function(data,callback) {
    // Reject any request that isnt GET request
    if(data.method == 'get') {
       
        // Prepare data for interpolation
        var templateData = {
            'head.title': 'Login to your Account',
            'head.description': 'Please enter you Phone Number and password to access your account.',
            'body.class': 'sessionCreate'
        }
         // Read in a template as a string
      helpers.getTemplate('sessionCreate',templateData,function(err,str) {
          if(!err && str) {
              // Add the universal header and footer
              helpers.addUniversalTemplates(str,templateData,function(err,str) {
                  if(!err && str) {
                     // Return the page as HTML
                     callback(200,str,'html');
                  } else {
                      callback(500,undefined,'html');
                  }
              })
          } else {
              callback(500,undefined,'html');
          }
      })
    } else {
        callback(405,undefined,'html')
     }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback) {
    // Reject any request that isnt GET request
    if(data.method == 'get') {
       
        // Prepare data for interpolation
        var templateData = {
            'head.title': 'Logged Out',
            'head.description': 'You have logged out of your account.',
            'body.class': 'sessionDeleted'
        }
         // Read in a template as a string
      helpers.getTemplate('sessionDeleted',templateData,function(err,str) {
          if(!err && str) {
              // Add the universal header and footer
              helpers.addUniversalTemplates(str,templateData,function(err,str) {
                  if(!err && str) {
                     // Return the page as HTML
                     callback(200,str,'html');
                  } else {
                      callback(500,undefined,'html');
                  }
              })
          } else {
              callback(500,undefined,'html');
          }
      })
    } else {
        callback(405,undefined,'html')
     }
    };

// Edit your Account
handlers.accountEdit = function(data,callback) {
    // Reject any request that isnt GET request
    if(data.method == 'get') {
       
        // Prepare data for interpolation
        var templateData = {
            'head.title': 'Account Settings',
            'body.class': 'accountEdit'
        }
         // Read in a template as a string
      helpers.getTemplate('accountEdit',templateData,function(err,str) {
          if(!err && str) {
              // Add the universal header and footer
              helpers.addUniversalTemplates(str,templateData,function(err,str) {
                  if(!err && str) {
                     // Return the page as HTML
                     callback(200,str,'html');
                  } else {
                      callback(500,undefined,'html');
                  }
              })
          } else {
              callback(500,undefined,'html');
          }
      })
} else {
 callback(405,undefined,'html')
}
};



// Available items
handlers.menuList = function(data,callback) {
    // Reject any request that isnt GET request
    if(data.method == 'get') {
       
        // Prepare data for interpolation
        var templateData = {
            'head.title': 'Available items',
            'body.class': 'menuList'
        }
         // Read in a template as a string
      helpers.getTemplate('menuList',templateData,function(err,str) {
          if(!err && str) {
              // Add the universal header and footer
              helpers.addUniversalTemplates(str,templateData,function(err,str) {
                  if(!err && str) {
                     // Return the page as HTML
                     callback(200,str,'html');
                  } else {
                      callback(500,undefined,'html');
                  }
              })
          } else {
              callback(500,undefined,'html');
          }
      })
    } else {
        callback(405,undefined,'html')
     }
};

// Added to cart
handlers.carts = function(data,callback) {
    // Reject any request that isnt GET request
    if(data.method == 'get') {
       
        // Prepare data for interpolation
        var templateData = {
            'head.title': 'Items added to your cart',
            'body.class': 'carts'
        }
         // Read in a template as a string
      helpers.getTemplate('carts',templateData,function(err,str) {
          if(!err && str) {
              // Add the universal header and footer
              helpers.addUniversalTemplates(str,templateData,function(err,str) {
                  console.log(err);
                  if(!err && str) {
                     // Return the page as HTML
                     callback(200,str,'html');
                  } else {
                      callback(500,undefined,'html');
                  }
              })
          } else {
              callback(500,undefined,'html');
          }
      })
    } else {
        callback(405,undefined,'html')
     }
};

// Index handler
handlers.index = function(data,callback) {
    // Reject any request that isnt GET request
    if(data.method == 'get') {
   
        // Prepare data for interpolation
        var templateData = {
            'head.title': 'Your happiness, Our pride',
            'head.description': 'We are the best online food delivering platform ',
            'body.class': 'index'
        }

         // Read in a template as a string
      helpers.getTemplate('index',templateData,function(err,str) {
        if(!err && str) {
            // Add the universal header and footer
            helpers.addUniversalTemplates(str,templateData,function(err,str) {
                if(!err && str) {
                   // Return the page as HTML
                   callback(200,str,'html');
                } else {
                    callback(500,undefined,'html');
                }
            })
        } else {
            callback(500,undefined,'html');
        }
    })
  } else {
      callback(405,undefined,'html')
  }
};

// Favicon
handlers.favicon = function(data,callback) {
    // Reject any request that isnt get request
    if(data.method == 'get') {
       // Read in the favicon's data
       helpers.getStaticAsset('favicon.ico', function(err,data) {
           if(!err && data) {
               callback(200,data,'favicon');
           } else {
               callback(500);
           }
       })
    } else {
        callback(405);
    }
};

// Public Assets
handlers.public = function(data,callback) {
    // Reject any request that isnt get request
    if(data.method == 'get') {
      // Get the filename being requested
      var trimmedAssetName =  data.trimmedPath.replace('public','').trim();
      if(trimmedAssetName.length > 0) {
        // Read in the asset data
        helpers.getStaticAsset(trimmedAssetName, function(err,data) {
            if(!err && data) {
              // Determine the content type(default to plain text)
              var contentType = 'plain';

              if(trimmedAssetName.indexOf('.css') > -1) {
                  contentType = 'css';
              }
              if(trimmedAssetName.indexOf('.jpg') > -1) {
                contentType = 'jpg';
              }
              if(trimmedAssetName.indexOf('.ico') > -1) {
                contentType = 'favicon';
              }
              callback(200,data,contentType);
            } else {
                callback(404);
            }
        })
      } else {
          callback(404);
      }
    } else {
        callback(500);
    }
}

// Users
handlers.users = function(data, callback) {
    var acceptableMethods = ["post", "get", "put", "delete"];
    if (acceptableMethods.indexOf(data.method > -1)) {
        // console.log(handlers._users);
        handlers._users[data.method](data, callback);
    } else {
        callback(405)
    };
};

// Container for the user submethod 
handlers._users = {};

// User post
// Required data: Name,email address and street address
// Optional data: none
handlers._users.post = function(data,callback) {
    // Check that required fields are filled out
   var userName = typeof(data.payload.userName) == 'string' && data.payload.userName.trim().length > 0 ? data.payload.userName.trim() : false;
   var emailAddress = typeof(data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 0 ? data.payload.emailAddress.trim() : false;
   var streetAddress = typeof(data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;
 
   if (userName && emailAddress && streetAddress) {
       _data.read('users',emailAddress,function(err,data) {
           if(err) {
               var userObject = {
                   'userName': userName,
                   'emailAddress': emailAddress,
                   'streetAddress': streetAddress,
                   'shoppingCart': [],
                   'order': []
               };

         // Store the user
        _data.create('users',emailAddress,userObject,function(err) {
            if(!err) {
                 callback(200);
            } else {
                callback(500,{'Error': 'Could not create new user'})
            }
        })
        } else {
            callback(404,{'Error': 'A user with that email already exist'})
        }
       })
   } else {
       callback(400,{'Error': 'You are missing required fields'})
   }
};

// Dont let unauthorised user update other peoples data 
handlers._users.put = function(data, callback) {
    // Check for the required field
    var emailAddress = typeof(data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 0 ? data.payload.emailAddress.trim() : false;
    // Check for the optional field
    var userName = typeof(data.payload.userName) == 'string' && data.payload.userName.trim().length > 0 ? data.payload.userName.trim() : false;
    var streetAddress = typeof(data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;
    // Error if the phone is invalid
    if(emailAddress) {
        if(userName || streetAddress) {

             // Get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        // Verify that the given token is valid for the specified user
        handlers._tokens.verifyTokens(token,emailAddress,function(validToken){
           if(validToken) {
          // Lookup users
          _data.read('users', emailAddress, function(err, userData) {
            if(!err && userData) {
            // Update the field where necessary
            if(userName) {
                userData.userName = userName;
            }
            if(streetAddress) {
               userData.streetAddress = streetAddress;
            }
            // Store the new data
        _data.update('users', emailAddress, userData,function(err){
            if(!err) {
             callback(200);
            } else {
                callback(500, {'Error': 'Could not update the user'});
            }
        })
           } else {
            callback(403, {'Error': 'Missing required token in header or token is invalid'});
           }
        });
         
            } else {
                callback(400, {'Error': 'The specified user does not exist'}); 
            }
          });
        } else { 
            callback(400, {'Error': 'Missing fields to update'})
        }
    } else {
        callback(400, {'Error': 'Missing required fields'});
    }
};


// Required data: email address
handlers._users.get = function(data,callback) {
    // Check that the email is valid
    var emailAddress = typeof(data.queryStringObject.emailAddress) == 'string' && data.queryStringObject.emailAddress.trim().length > 0 ? data.queryStringObject.emailAddress.trim() : false;
    if(emailAddress) {
        // Verify using user token
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
       // Verify if the given token is valid
       handlers._tokens.verifyTokens(token,emailAddress,function(validToken) {
           if(validToken) {
               // Lookup user
              _data.read('users',emailAddress,function(err,data) {
                  if(!err && data) {
                    callback(200,data);
                  } else {
                      callback(500);
                  }
              })
           } else {
               callback(400,{'Error': 'The token has either expired or invalid'});
           }
       })
    } else {
        callback(400,{'Error': 'Missing required field'});
    };
};

// Menu
handlers.menu = function(data, callback) {
    var acceptableMethods = ["post", "get", "put", "delete"];
    if (acceptableMethods.indexOf(data.method > -1)) {
        handlers._menu[data.method](data, callback);
    } else {
        callback(405)
    };
};

// Container for the menu method
handlers._menu = {};

// Required data: email Address
// Optional data: none
handlers._menu.get = function(data,callback) {
    var emailAddress = typeof(data.queryStringObject.emailAddress) == 'string' && data.queryStringObject.emailAddress.trim().length > 0 ? data.queryStringObject.emailAddress.trim() : false;
    if(emailAddress) {
       // Verify using user token
       var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
       // Verify if the given token is valid
       handlers._tokens.verifyTokens(token,emailAddress,function(validToken) {
        if(validToken) {
           _data.read('menu','menu',function(err,menuData){
               if(!err && menuData) {
                   callback(200,menuData)
               } else {
                   callback(err);
               }
           })
        } else {
            callback(400,{'Error': 'Token is invalid or expired'});
        }
     })
    } else {
        callback(400,{'Error':'Email address is not for the specified user'});
    }
};

// Shopping Cart
handlers.cart = function(data, callback) {
    var acceptableMethods = ["post", "get", "put", "delete"];
    if (acceptableMethods.indexOf(data.method > -1)) {
        handlers._cart[data.method](data, callback);
    } else {
        callback(405)
    };
};

// Container for the cart method
handlers._cart = {};



// handler post for cart
handlers._cart.post = function(data, callback) {
    var items = typeof(data.payload.items) == 'object' && data.payload.items instanceof Array && data.payload.items.length > 0 ? data.payload.items : false
    const availableItems = [];
    const unavailableItems = [];
     if(items) {
         // Get the tokens from the headers
     var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
         // Lookup token
        _data.read('tokens',token,function(err,tokenData) {
            console.log(err);
            if(!err && tokenData) {
                var emailAddress = tokenData.emailAddress
               _data.read('menu','menu',function(err,menuData) {
                   const foods = menuData.available.foods
                   const wines = menuData.available.wines
                   if(!err && menuData) {
                      for(item of items){
                          if(foods.includes(item) || wines.includes(item)){
                              availableItems.push(item)
                          } else {
                              unavailableItems.push(item)
                          }
                      }
                     _data.read('users',emailAddress,function(err,userData) {
                         if(!err && userData) {
                            const newUserData = { ...userData, shoppingCart: [...userData.shoppingCart, ...availableItems ] }
                              _data.update('users',emailAddress,newUserData,function(err) {
                                if(!err) {
                                     callback(200,{...newUserData, unavailableItems: [...unavailableItems]});
                                } else {
                                    callback(500,{'Error': 'Could not update user with the new item u added to the shopping cart '});
                                }
                            })
                         } else {
                            callback(err);
                         }
                     })
                   } else {
                    callback(400,{'Error': 'The item isnt in the menu item'});
                   }
               }) 
            } else {
                callback(400,{'Error': 'The token is invalid or has expired'});
            }
        })
     } else {
         callback(400,{'Error': 'Item is either empty or not in the list of menu items'})
     }
}

// Get for cart
handlers._cart.get = function(data, callback) {
    // Check that the phone number is valid
        var emailAddress = typeof(data.queryStringObject.emailAddress) == 'string' && data.queryStringObject.emailAddress.trim().length > 0 ? data.queryStringObject.emailAddress.trim() : false;
        if(emailAddress) {
            // Get the token from the headers
            var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
            // Verify that the given token is valid for the specified user
            handlers._tokens.verifyTokens(token,emailAddress,function(validToken){
               if(validToken) {
                    // Lookup users
            _data.read('users', emailAddress, function(err, userData) {
                if(!err && userData) {
                 callback(200, { 'data': userData.shoppingCart});
                } else {
                    callback(404);
                }
            })
               } else {
                   callback(403, {'Error': 'Missing required token in header or token is invalid'});
               }
            });
          
        } else {
            callback(400, {'Error': 'Missing required field'});
        };
    };

// Order
handlers.order = function(data, callback) {
    var acceptableMethods = ["post", "get", "put", "delete"];
    if (acceptableMethods.indexOf(data.method > -1)) {
        handlers._order[data.method](data, callback);
    } else {
        callback(405)
    };
};

// Container for the order method
handlers._order = {};


// handler post for order
handlers._order.post = function(data,callback) {
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup the user by reading token
    _data.read('tokens',token,function(err,tokenData) {
         if(!err && tokenData) {
             var emailAddress = tokenData.emailAddress;
   helpers.verifyPayment(emailAddress,data,function(err) {
       var amount = typeof(data.payload.amount) == 'number' ? data.payload.amount : false;
       var currency = typeof(data.payload.currency) == 'string' && data.payload.currency.trim().length > 0 ? data.payload.currency.trim() : false;
       var source = typeof(data.payload.source) == 'string' && data.payload.source.trim().length > 0 ? data.payload.source.trim() : false;
       var description = typeof(data.payload.description) == 'string' && data.payload.description.trim().length > 0 ? data.payload.description.trim() : false;

  if(amount && currency && source && description) {
        _data.read('users',emailAddress,function(err,userData){
            if(!err && userData) {
                const shoppingCart = userData.shoppingCart
                const orderedItem = { ...userData, order: [...userData.order, ...shoppingCart] }
               _data.update('users',emailAddress,orderedItem,function(err) {
                   if(!err) {
                       callback(200,{...orderedItem});
                   } else {
                       callback(400,err);
                   }
               })
            } else {
               callback(400,{'Error': 'There is no such user'}) 
            }
        })
       } else {
           callback(400,{'Error': 'Missing required field'});
       }
       
});
         } else {
             callback(400,{'Error': 'The token has either expired or invalid'});
         }
    })
};

// Get for order
handlers._order.get = function(data, callback) {
    // Check that the phone number is valid
        var emailAddress = typeof(data.queryStringObject.emailAddress) == 'string' && data.queryStringObject.emailAddress.trim().length > 0 ? data.queryStringObject.emailAddress.trim() : false;
        if(emailAddress) {
    
            // Get the token from the headers
            var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    
            // Verify that the given token is valid for the specified user
            handlers._tokens.verifyTokens(token,emailAddress,function(validToken){
               if(validToken) {
                    // Lookup users
            _data.read('users', emailAddress, function(err, userData) {
                if(!err && userData) {
                 callback(200, userData.order);
                } else {
                    callback(404);
                }
            })
               } else {
                   callback(403, {'Error': 'Missing required token in header or token is invalid'});
               }
            });
          
        } else {
            callback(400, {'Error': 'Missing required field'});
        };
    };





// Tokens
handlers.tokens = function(data, callback) {
    var acceptableMethods = ["post", "get", "put", "delete"];
    if (acceptableMethods.indexOf(data.method > -1)) {
        console.log(handlers._tokens)
        handlers._tokens[data.method](data, callback);
    } else {
        callback(405)
    };
};

// Container for the token method
handlers._tokens = {};

// Token post
// Required data: userName, email
// Optional data: none
handlers._tokens.post = function(data, callback) {
    var emailAddress = typeof(data.payload.emailAddress) == 'string' && data.payload.emailAddress.trim().length > 0 ? data.payload.emailAddress.trim() : false;

    if(emailAddress) {
        // Lookup users that matches the email address
        _data.read('users',emailAddress,function(err,userData) {
            if(!err && userData) {
                var tokenId = helpers.createRandomString(20);
                var expires = Date.now() + 1000 * 60 * 60 * 24;
                var tokenObject = {
                  'emailAddress': emailAddress,
                  'id' : tokenId,
                  'expires': expires
               };

          // Store the token
          _data.create('tokens',tokenId,tokenObject,function(err) {
             if(!err) {
                callback(200,tokenObject);
             } else {
              callback(500,{'Error': 'Could not create token'})
             }
          })
            } else {
                callback(400,{'Error': 'There is no such user'});
            }
        })
    } else {
        callback(400,{'Error': 'Missing required fields'});
    }
};

// Token get
// Required data: id
// Optional: none
handlers._tokens.get = function(data, callback) {
    // Check that the id is valid
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id) {
        // Lookup tokens
        _data.read('tokens', id, function(err, tokenData) {
            if(!err && tokenData) {
             callback(200, tokenData);
            } else {
                callback(404);
            }
        })
    } else {
        callback(400, {'Error': 'Missing required field'});
    };
};

// Token put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data, callback) {
    var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;

    if(id && extend) {
     // Lookup the tokens
     _data.read('tokens',id,function(err,tokenData) {
         if(!err && tokenData) {
             // Check to make sure the token isnt already expired
            if(tokenData.expires > Date.now()) {
                // Set the expiration an hour from now
                tokenData.expires = Date.now() + 1000 * 60 * 60 * 24;

                // Store the new updates
                _data.update('token', id, tokenData, function(err) {
                    if(err) {
                        callback(200);
                    } else {
                        callback(500, {'Error': 'Could not update token\'s expiration'});
                    }
                })
            } else {
                callback(400, {'Error': 'The token has already expired and cannot be extended'});
            }
         } else {
           callback(400, {'Error': 'Specified token does not exist'})
         }
     })
    } else {
        callback(400, {'Error': 'Missing required field(s) or field(s) are invalid'});
    }
};

// Token delete
// Required data: id
// Optional data: delete 
handlers._tokens.delete = function(data, callback) {
    // Check that the id is valid
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id) {
        // Lookup token
        _data.read('tokens',id,function(err, data) {
            if(!err && data) {
            _data.delete('tokens',id,function(err) {
                if(!err) {
                    callback(200)
                } else {
                    callback(500, {'Error': 'Could not delete specified token'});
                }
            });
            } else {
                callback(400, {'Error': 'Could not find the specified token'});
            };
        });
    } else {
        callback(400, {'Error': 'Missing required field'});
    };
    };


handlers._tokens.verifyTokens = function(id,emailAddress,callback) {
    // Check the token
    _data.read('tokens',id,function(err,tokenData) {
         console.log(err,tokenData);
        if(!err && tokenData) {
         // Check if the token is for the given user and has not expired
         if(tokenData.emailAddress == emailAddress && tokenData.expires >= Date.now()) {
            callback(true);
         } else {
            callback(false)
         }
        } else {
            callback(false)
        }
    })
}





// Not found handlers
handlers.notFound= function(data, callback) {
    callback(404);
};

//Export the module
module.exports = handlers;