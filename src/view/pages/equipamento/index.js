
import Header from "../../components/header"
import Sidebar from "../../components/sidebar";
const Equipamento = () =>{
    return (
        <>
        <div className="container-fluid h-100">
            <div className="row h-100">
              <Header />
              <Sidebar />
              <div className="col p-5 overflow-auto h-100">
                 <div className="row">
                     <div className="col-12">
                     <h2>Equipamentos</h2>
                     </div>
                 </div>
                 
       
              </div>
            </div>
        </div>
      
        </>
    )
}

export default Equipamento;