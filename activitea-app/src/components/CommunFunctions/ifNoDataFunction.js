const ifNoData = (datatable) =>{

    if (datatable.length === 0) {
        console.log("taille", datatable.length );
        return <div>
                    <h3 className="text-center">Vous n'avez pas de données stockées</h3>
                    <p className="text-center">Cliquez plus bas pour vous dirigez vers le formulaire d'incrption</p>
                </div>
    }
    return null
}
export default ifNoData