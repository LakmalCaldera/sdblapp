// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require js-routes
//= require_tree .


var extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

window.App || (window.App = {});

App.Base = (function () {
    function Base() {
        if (window.jQuery) {
            this.setClearEventHandlers();
        }
        return this;
    }


    /*
     Run the new action for the create action.  Generally the create action will 'render :new' if there was a problem.
     This prevents doubling the code for each action.
     */

    Base.prototype.create = function () {
        if (typeof $this["new"] === 'function') {
            return $this["new"]();
        }
    };


    /*
     Run the edit action for the update action.  Generally the update action will 'render :edit' if there was a problem.
     This prevents doubling the code for each action.
     */

    Base.prototype.update = function () {
        if (typeof $this.edit === 'function') {
            return $this.edit();
        }
    };


    /*
     Clear event handlers with a blank namespace.  This will prevent window and document event handlers from stacking
     when each new page is fetched.  Adding a namespace to your events will prevent them from being removed between page
     loads, i.e. "$(window).on 'scroll.app', myHandler"
     */

    Base.prototype.setClearEventHandlers = function () {
        return jQuery(document).on('page:before-change', function () {
            var element, event, handler, handlers, i, len, ref, results;
            ref = [window, document];
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                element = ref[i];
                results.push((function () {
                    var ref1, results1;
                    ref1 = jQuery._data(element, 'events') || {};
                    results1 = [];
                    for (event in ref1) {
                        handlers = ref1[event];
                        results1.push((function () {
                            var j, len1, results2;
                            results2 = [];
                            for (j = 0, len1 = handlers.length; j < len1; j++) {
                                handler = handlers[j];
                                if ((handler != null) && handler.namespace === '') {
                                    results2.push(jQuery(element).off(event, handler.handler));
                                } else {
                                    results2.push(void 0);
                                }
                            }
                            return results2;
                        })());
                    }
                    return results1;
                })());
            }
            return results;
        });
    };

    return Base;

})();

App.Agents = (function (superClass) {
    extend(Agents, superClass);

    function Agents() {
        return Agents.__super__.constructor.apply(this, arguments);
    }

    Agents.prototype.index = function () {
        return $(function () {
            var table = $.agentsTable = $('#agentTable').DataTable({
                ajax: Routes.agents_path(),
                columns: [
                    {
                        data: "account"
                    }, {
                        data: "branch"
                    }, {
                        data: "region"
                    }, {
                        data: "actions",
                        orderable: false

                    }
                ],
                initComplete: function () {
                    var api = this.api();
                    $.agentsDataTableApi = api;
                },
                dom: '<"agent-add-action">frtip',
                language: {
                    "lengthMenu": "Display _MENU_ records per page",
                    "zeroRecords": "No agents available",
                    /*"info": "Showing page _PAGE_ of _PAGES_",*/
                    "info": "<table><th><strong>Agents Summary</strong></th><tr><td>Agent count after filter</td><td class='summary-colon'>:</td><td> _TOTAL_</td></tr><tr><td>Total agent count</td><td class='summary-colon'>:</td><td> _MAX_</td></tr>",
                    "infoEmpty": "No agents available",
                    "infoFiltered": ""
                },
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    //"defaultContent": '<a><i class="fa fa-times red-text"></i>Delete</a>'
                    "defaultContent": function () {
                        return $("body").attr("user-is-admin") == "true" ? '<ul class="nav nav-tabs zero-border"><li class="delete-btn"><a>Delete</a></li><li class="update-btn"><a>Update</a></li></ul>' : 'None Available'
                    }()
                }]
            });


            $("div.agent-add-action").html('<ul class="nav nav-tabs zero-border"><li class="sign-out"><a class="nav-link" id="create_agent_btn"><span class="glyphicon glyphicon-plus-sign"></span>&nbsp;Agent</a></li></ul>');

            $('#agentTable tbody').on('click', '.delete-btn', function () {
                var data = table.row($(this).parents('tr')).data();

                $.confirm({
                    title: 'Confirm Delete Agent!',
                    content: "Are you sure you want to delete <strong>Agent " + data.account + "</strong>?<br>And all associated transactions?",
                    type: 'red',
                    buttons: {
                        ok: {
                            text: 'Confirm',
                            btnClass: 'btn-red',
                            action: function () {
                                clientComm.delete("agents", data.account, function (res) {
                                    $.alert({
                                        title: 'Success!',
                                        content: "Deleted <strong>Agent " + data.account + "</strong> and all its transactions.",
                                        type: 'green',
                                        typeAnimated: true,
                                        buttons: {
                                            ok: {
                                                text: 'Ok',
                                                action: function () {
                                                }
                                            }
                                        }
                                    });
                                    table.draw();
                                }, function (xhr, status, error) {
                                    $.alert({
                                        title: 'Error!',
                                        content: "Agent could not be delete at the moment. Please contact admin.",
                                        type: 'red',
                                        typeAnimated: true,
                                        buttons: {
                                            ok: {
                                                text: 'Ok',
                                                action: function () {
                                                }
                                            }
                                        }
                                    });
                                    table.draw();
                                });
                            }
                        },
                        close: function () {
                        }
                    }
                });
            });





            $('#agentTable tbody').on('click', '.update-btn', function () {
                var data = table.row($(this).parents('tr')).data();

                $.confirm({
                    title: 'Update Agent',
                    content: '' +
                    '<form class="formName" id="create-agent-form">' +
                    '<div class="form-group">' +
                    '<label>Enter Account:</label>' +
                    '<input type="text" placeholder="Account" class="account-field form-control" required  maxlength="12" value="'+ data.account +'" readonly/>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label>Enter Branch:</label>' +
                    '<input type="text" placeholder="Branch" class="branch-field form-control" required  value="'+ data.branch +'" />' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label>Enter Region:</label>' +
                    '<input type="text" placeholder="Region" class="region-field form-control" required  value="'+ data.region +'" />' +
                    '</div>' +
                    '</form>',
                    type: "orange",
                    buttons: {
                        formSubmit: {
                            text: 'Update',
                            btnClass: 'btn-orange',
                            action: function () {
                                var accountFieldValue = this.$content.find('.account-field').val();
                                var branchFieldValue = this.$content.find('.branch-field').val();
                                var regionFieldValue = this.$content.find('.region-field').val();
                                if(!accountFieldValue){
                                    $.alert({
                                        title: 'Validation Error!',
                                        content: "Please enter an Account id.",
                                        type: 'red',
                                        typeAnimated: true,
                                        buttons: {
                                            ok: {
                                                text: 'Ok',
                                                action: function () {
                                                }
                                            }
                                        }
                                    });
                                    return false;
                                }else if(!regionFieldValue){
                                    $.alert({
                                        title: 'Validation Error!',
                                        content: "Please enter a Region.",
                                        type: 'red',
                                        typeAnimated: true,
                                        buttons: {
                                            ok: {
                                                text: 'Ok',
                                                action: function () {
                                                }
                                            }
                                        }
                                    });
                                    return false;
                                }else{
                                    if(accountFieldValue.length < 6){
                                        $.alert({
                                            title: 'Validation Error!',
                                            content: "Account id must be 6 or more characters.",
                                            type: 'red',
                                            typeAnimated: true,
                                            buttons: {
                                                ok: {
                                                    text: 'Ok',
                                                    action: function () {
                                                    }
                                                }
                                            }
                                        });
                                        return false;
                                    }else{
                                        clientComm.put("/agents/"+accountFieldValue, "account="+pad_with_zeroes(accountFieldValue, 12)+"&branch="+branchFieldValue+"&region="+regionFieldValue, function(){
                                            //Successs
                                            $.alert({
                                                title: 'Success!',
                                                content: "Agent successfully updated.",
                                                type: 'green',
                                                typeAnimated: true,
                                                buttons: {
                                                    ok: {
                                                        text: 'Ok',
                                                        action: function () {
                                                        }
                                                    }
                                                }
                                            });
                                            $.agentsTable.draw();
                                        }, function(){
                                            // Fail
                                            $.alert({
                                                title: 'Server Error!',
                                                content: "Error trying to update agent. Please contact admin.",
                                                type: 'red',
                                                typeAnimated: true,
                                                buttons: {
                                                    ok: {
                                                        text: 'Ok',
                                                        action: function () {
                                                        }
                                                    }
                                                }
                                            });


                                        })
                                    }
                                }
                            }
                        },
                        cancel: function () {
                            //close
                        },
                    },
                    onContentReady: function () {
                        // bind to events
                        var jc = this;
                        this.$content.find('form').on('submit', function (e) {
                            // if the user submits the form by pressing enter in the field.
                            e.preventDefault();
                            jc.$$formSubmit.trigger('click'); // reference the button and click it
                        });
                    }
                });
            });




        });
    };

    return Agents;

})(App.Base);


App.Transactions = (function (superClass) {
    extend(Transactions, superClass);

    function Transactions() {
        return Transactions.__super__.constructor.apply(this, arguments);
    }

    Transactions.prototype.index = function () {
        return $(function () {
            $('#transactionTable').DataTable({
                ajax: Routes.transactions_path(),
                columns: [
                    {
                        data: "agent"
                    }, {
                        data: "branch"
                    }, {
                        data: "region"
                    }, {
                        data: "customer"
                    }, {
                        data: "timestamp"
                    }, {
                        data: "status"
                    }, {
                        data: "mobile"
                    }, {
                        data: "amount",
                        render: $.fn.dataTable.render.number(',', '.', 2)
                    }
                ],
                order: [[ 4, "desc" ]],
                "fnFooterCallback": function (nRow, aaData, iStart, iEnd, aiDisplay) {
                    var api = this.api();
                    $.transDataTableApi = api;
                    var response = this.api().ajax.json();

                    var totalValueString = 'Rs ' + response["filteredTotalAmount"].toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    // Update footer
                    $(api.column(7).footer()).html(
                        totalValueString
                    );
                },
                columnDefs: [{
                    targets: 4,
                    render: $.fn.dataTable.render.moment('X', 'Do MMM YY - hh:mm a')
                }],
                initComplete: function () {
                    $('.filters input, .filters select', this).on('keyup', (function (_this) {
                        return function (e) {
                            var th;
                            th = $(e.target).closest("th");
                            return _this.api().column(th.index()).search($(e.target).val()).draw();
                        };
                    })(this));
                },
                dom: 'Bfrtip',
                language: {
                    "lengthMenu": "Display _MENU_ records per page",
                    "zeroRecords": "No transactions available",
                    /*"info": "Showing page _PAGE_ of _PAGES_",*/
                    "info": "<table><th><strong>Transactions Summary</strong></th><tr><td>Transaction count after filter</td><td class='summary-colon'>:</td><td> _TOTAL_</td></tr><tr><td>Total transaction count</td><td class='summary-colon'>:</td><td> _MAX_</td></tr>",
                    "infoEmpty": "No transactions available",
                    "infoFiltered": ""
                }
            });

        });
    };

    return Transactions;

})(App.Base);

$(function () {


    $.ajaxSetup({
        error: function (jqXHR, exception) {
            var errorString = "";
            if (jqXHR.status === 0) {
                errorString = ('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                errorString = ('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                errorString = ('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                errorString = ('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                errorString = ('Time out error.');
            } else if (exception === 'abort') {
                errorString = ('Ajax request aborted.');
            } else {
                errorString = ('Uncaught Error.\n' + jqXHR.responseText);
            }

            $.alert({
                title: 'Communication Error!',
                content: errorString,
                type: 'red',
                typeAnimated: true,
                buttons: {
                    ok: {
                        text: 'Ok',
                        action: function () {
                        }
                    }
                }
            });

        }
    });


    return $.extend($.fn.DataTable.defaults, {
        searching: true,
        ordering: true,
        deferRender: true,
        pagination: true,
        paginationType: "full_numbers",
        /*bPaginate:true, // Pagination True
         sPaginationType:"full_numbers", // And its type.*/
        fixedHeader: {
            header: false,
            footer: true
        },
        /*processing: true,*/
        serverSide: true,
        /*scroller: true,
         scrollY: 500,*/
        paging: true,
        /*language: {
         "processing": "<div class='data-loader-container'><div class='data-loader'></div><br><div class='loading-text'>Loading...</div></div>"
         },*/
    });
});

var clientComm = new function () {
    return {
        delete: function (table, id, success, fail) {
            $.ajax({
                url: '/' + table + '/delete',
                type: 'DELETE',
                data: "item="+id,
            }).done(success).fail(fail);
        },
        post: function (_url, _data, success, fail){
            $.ajax({
                url: _url,
                data: _data,
                type: 'POST'
            }).done(success).fail(fail);
        },
        put: function (_url, _data, success, fail){
            $.ajax({
                url: _url,
                data: _data,
                type: 'PUT'
            }).done(success).fail(fail);
        }
    }
}()


function pad_with_zeroes(string, length) {
    while (string.length < length) {
        string = '0' + string;
    }
    return string;
}

