odoo.define('web_x2many_selectable.form_widgets', function (require) {
"use strict";
var core = require('web.core');
var Model = require('web.Model');
var _t = core._t;
var QWeb = core.qweb;
var FieldOne2Many = core.form_widget_registry.get('one2many');

var X2ManySelectable = FieldOne2Many.extend({
		multi_selection: true,
		init: function() {
	        this._super.apply(this, arguments);
	    },
	    start: function() 
	    {
	    	this._super.apply(this, arguments);
	    	var self=this;
	    	this.$el.prepend(QWeb.render("X2ManySelectable", {widget: this}));
	        this.$el.find(".ep_button_confirm").click(function(){
	        	self.action_selected_lines();
	        });
	   },

	   action_selected_lines: function()
	   {
		var self = this;
		var selected_ids = self.get_selected_ids_one2many();
		if (selected_ids.length === 0)
		{
		    this.do_warn(_t("You must choose at least one record."));
		    return false;
		}
		var model_obj=new Model(this.dataset.model); //you can hardcode model name as: new Model("module.model_name");
		//you can change the function name below
		model_obj.call('bulk_verify',[selected_ids],{context:self.dataset.context})
		.then(function(result){
		});
			
	   },
	   get_selected_ids_one2many: function ()
	   {
	       var ids =[];
	       this.$el.find('th.oe_list_record_selector input:checked')
	               .closest('tr').each(function () {
	               	ids.push(parseInt($(this).context.dataset.id));
	       });
	       return ids;
	   },
	});
	core.form_widget_registry.add('x2many_selectable', X2ManySelectable);
	return X2ManySelectable;
});
