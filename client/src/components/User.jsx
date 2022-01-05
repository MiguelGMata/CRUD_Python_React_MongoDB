import React, {useState, useEffect} from 'react';

const API = process.env.REACT_APP_API;

export const Users = () => { 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");

    const [users, setUsers] = useState([]); 
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState("");
    
    //----------------------------------Ajouter un utilisateur-----------------------------------------
    const handleSubmit= async (e) => {
        e.preventDefault();
        //console.log(name, email, telephone)
       if (!update){
        const res = await fetch(`${API}/users`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                telephone,
            }),
        });
        await res.json();
       } else {
            const res = await fetch(`${API}/user/${id}`, {
               method: 'PUT',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   name,
                   email,
                   telephone
               }),
           });  
        const data = await res.json();
        console.log(data) 
        setUpdate(false);
        setId("");
       }
       
        await getUsers();

        setName('');
        setEmail('');
        setTelephone(''); 
    }

 //----------------------------------Recuperer un utilisateur-----------------------------------------
    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    };

    //----------------------------------Effacer un utilisateur-----------------------------------------
    const deleteUser = async (id) => {
        //console.log(id)
        const modalDelete = window.confirm('Etes-vous sûr de vouloir supprimer cet élément ?')
        if (modalDelete) {
        const res = await fetch(`${API}/user/${id}`, { 
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data)
        await getUsers(); 
        }
    }

     //----------------------------------Modifier un utilisateur-----------------------------------------
    const updateUser =async (id) => {
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json();
        //console.log(data)
        setUpdate(true); //
        setId(id)
        //Reset
        setName(data.name)
        setEmail(data.email)
        setTelephone(data.telephone)
       
    }
    useEffect(() => {
        getUsers();
    }, [])
      
    
    return (
        <div className="row">
         <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Prenom"
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="telephone"
              onChange={(e) => setTelephone(e.target.value)}
              value={telephone}
              className="form-control"
              placeholder="Mot de passe"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {update ? 'Editer' : 'Créer'}
          </button>
        </form>
      </div>
            <div className="col-md-8">
              <table className="table table-striped">
                  <thead>
                      <tr>
                          <th>Prenom</th>
                          <th>Email</th>
                          <th>Téléphone</th>
                          <th>Operations</th>
                      </tr>
                  </thead>
                  <tbody>
                  {users.map(user => (
                    <tr  key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.telephone}</td>
                        <td>
                            <button 
                            type="button"
                            className='btn btn-secondary btn-sm btn-block'
                            onClick={() => updateUser(user._id)}
                            >
                                ✍🏻
                            </button>
                            <button 
                            type="button" 
                            className='btn btn-danger btn-sm btn-block'
                            onClick={() => deleteUser(user._id)}
                            >
                                🗑
                            </button>
                        </td>
                    </tr>
                ))}
                  </tbody>
              </table>
            </div>
        </div>
    )
}