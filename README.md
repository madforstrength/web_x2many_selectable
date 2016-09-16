# web_x2many_selectable
This widget adds the capability for selecting multiple records in x2many fields and calls a python function with the ids as argument.

Its really easy to use, just add **widget=x2many_selectable** on any x2many field.

e.g.

~~~~.html
<field name="course_id" widget="x2many_selectable">
  <tree>
    <field name="title" />
  </tree>
</field>
~~~~

You can get the selected records in python function, a smple python function is as follows:

~~~~{.python}
@api.multi
def bulk_verify(self):
    for record in self:
	print record
~~~~

By default the widget will pick model from x2many field and default function name is "bulk_verify".
You can change the model as well as python function name from javascript.
