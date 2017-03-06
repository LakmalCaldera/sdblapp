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
            $('#agentTable').dataTable({
                ajax: Routes.agents_path(),
                columns: [
                    {
                        data: "account"
                    }, {
                        data: "branch"
                    }
                ]
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
            var gApi;
            var tranTable = $('#transactionTable').dataTable({
                ajax: Routes.transactions_path(),
                columns: [
                    {
                        data: "uid"
                    }, {
                        data: "customer"
                    }, {
                        data: "timestamp"
                    }, {
                        data: "status"
                    }, {
                        data: "mobile"
                    }, {
                        data: "amount"
                    }
                ],
                "fnFooterCallback": function (nRow, aaData, iStart, iEnd, aiDisplay) {
                    var api = this.api();
                    gApi = api;
                    var response = this.api().ajax.json();

                    // Update footer
                    $(api.column(5).footer()).html(
                        'Rs ' + response["filteredTotalAmount"]
                    );
                },
                columnDefs: [{
                    targets: 2,
                    render: $.fn.dataTable.render.moment('X', 'Do MMM YY')
                }]
            });


            $(".datepicker").datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: 'yy-mm-dd',
                onClose: function (selectedDate) {
                    tranTable.fnDraw();
                }
            });


            function isValidDate(date) {
                console.log(date)
                var pattern = /^([0-9]{4}-([0-9]{2})-([0-9]{2}))$/;
                return (pattern.test(date));
            }

            $("#dateFilter").datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: 'yy-mm-dd',
                onClose: function (selectedDate) {
                    if (isValidDate(selectedDate)) {
                        console.log("valid date");
                        var now = new Date(selectedDate);
                        gApi.column(2).search(new Date(new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime() / 1000).draw();
                    } else if (selectedDate.length == 0) {
                        gApi.column(2).search("").draw();
                    } else {
                        console.log("invalid date");
                        gApi.column(2).search("x").draw();
                    }
                }
            });


        });
    };

    return Transactions;

})(App.Base);

$(function () {
    return $.extend($.fn.DataTable.defaults, {
        searching: true,
        ordering: true,
        deferRender: true,
        fixedHeader: {
            header: false,
            footer: false
        },
        processing: true,
        serverSide: true,
        ajax: $("#transactionsTable").data("source"),
        scroller:       true,
        paging: true,
        scrollY:  400,
        language: {
            "processing": "<div class='data-loader-container'><div class='data-loader'></div><br><div class='loading-text'>Loading data from server...</div></div>"
        },
        initComplete: function () {
            return $('.filters input, .filters select', this).on('keyup', (function (_this) {
                return function (e) {
                    var th;
                    th = $(e.target).closest("th");
                    return _this.api().column(th.index()).search($(e.target).val()).draw();
                };
            })(this));
        }
    });
});

// ---
// generated by coffee-script 1.9.2

