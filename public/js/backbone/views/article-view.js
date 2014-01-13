Puls4.Views.Article=Backbone.View.extend({
	events:{
		"click  .acciones .votos .up":"upvote",
		"click  .acciones .votos .down":"downvote"
	},
	tagName:"article",
	className:"post",
	initialize:function () {
		var self=this;
		//console.log(this.$el);

		//this.template=_.template($('#article-template').html());
		this.template=swig.compile($('#article-template').html());
		
		this.model.on('change',function(model){
			self.render();
		});
	},
	upvote:function(e){
		e.preventDefault();
		var votes=parseInt(this.model.get('votes'),10);

		this.model.set('votes',++votes);
		this.model.save();
	},
	downvote:function(e){
		e.preventDefault();
		var votes=parseInt(this.model.get('votes'),10);

		this.model.set('votes',--votes);
		this.model.save();
	},
	render:function(){
		var data=this.model.toJSON();

		var tags=data.tags.toString();
		data.tags=tags.split(",");
		//console.log(data)

		var html=this.template(data);

		this.$el.html(html);
	}
})