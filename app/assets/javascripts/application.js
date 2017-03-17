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
            var table = $('#agentTable').DataTable({
                ajax: Routes.agents_path(),
                columns: [
                    {
                        data: "account"
                    }, {
                        data: "branch"
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
                    "info": "<strong>Agents Summary:</strong><br>Showing: _START_ to _END_ records<br>Number of agents after filter: _TOTAL_<br>Total number of agents: _MAX_",
                    "infoEmpty": "No agents available",
                    "infoFiltered": ""
                },
                columnDefs: [{
                    "targets": -1,
                    "data": null,
                    //"defaultContent": '<a><i class="fa fa-times red-text"></i>Delete</a>'
                    "defaultContent": function () {
                        return $("body").attr("user-is-admin") == "true" ? '<ul class="nav nav-tabs zero-border"><li class="delete-btn"><a>Delete</a></li></ul>' : 'None Available'
                    }()
                }]
            });


            $("div.agent-add-action").html('<ul class="nav nav-tabs zero-border"><li class="sign-out"><a class="nav-link" data-toggle="modal" data-target="#createModal"><span class="glyphicon glyphicon-plus-sign"></span>&nbsp;Agent</a></li></ul>');

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
                                                    table.draw();
                                                }
                                            }
                                        }
                                    });
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
                                                    table.draw();
                                                }
                                            }
                                        }
                                    });
                                });
                            }
                        },
                        close: function () {
                        }
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
                "fnFooterCallback": function (nRow, aaData, iStart, iEnd, aiDisplay) {
                    var api = this.api();
                    $.transDataTableApi = api;
                    var response = this.api().ajax.json();

                    // Update footer
                    $(api.column(6).footer()).html(
                        'Rs ' + response["filteredTotalAmount"].toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                    );
                },
                columnDefs: [{
                    targets: 3,
                    render: $.fn.dataTable.render.moment('X', 'Do MMM YY')
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
                dom: '<"agent-add-action">frtip',
                language: {
                    "lengthMenu": "Display _MENU_ records per page",
                    "zeroRecords": "No transactions available",
                    /*"info": "Showing page _PAGE_ of _PAGES_",*/
                    "info": "<strong>Transactions Summary:</strong><br>Showing: _START_ to _END_ records<br>Number of transactions after filter: _TOTAL_<br>Total number of transactions: _MAX_",
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
                url: '/' + table + '/' + id,
                type: 'DELETE'
            }).done(success).fail(fail);
        }
    }
}()

