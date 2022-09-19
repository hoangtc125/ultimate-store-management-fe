function BillRelationItem ({
  id = "",
  created_at = "",
  status = "",
}) {
  this.id = id
  this.created_at = created_at
  this.status = status
}

function BillRelation({
  id = "",
  childs = []
}) {
  this.id = id
  this.childs = childs
}

export { BillRelation, BillRelationItem}