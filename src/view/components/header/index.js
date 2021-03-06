import React from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {deslogar} from '../../../store/actions/auth.action';

import {usuariologado} from '../../../store/actions/auth.action'

import {useSelector,useDispatch} from 'react-redux'
import { CircularProgress } from '@material-ui/core';
const Header = () =>{
  const [isLoading,setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const data = useSelector(state =>state.authReducers);
  React.useEffect(()=>{
    dispatch(usuariologado()).then(res =>{
     setIsLoading(false);
    })
},[])
    return (
      
     <>
     
     {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> :
      <>
      {(window.innerWidth < 577) ? 
        <>
        </>
       :
      <header className="container-fluid d-flex justify-content-end">
       <div className="d-flex align-items-center"  onClick={() => dispatch(deslogar())}>
            <div className="text-right mr-3">
                <span className="d-block m-0 p-0 text-white">{data.usuario.nome.split(" ")[0]}</span>
                {data.usuario.permissoes.map(permissao =>(
                  (permissao.nome == "ADM") &&
                  <small className="m-0 p-0">Administrador</small>
                  
                ))}
                
            </div>
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQSEhUSFRYYGBISGBQYGBgSEhgaGRIcGRgZGRkaGBgcIS4lHB8sHxgaJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHxISHzEsIys9Njo9NDQ0NDE0NDExNDoxNDUxNjQ0NDQ0NDQxNDQ0NDQxMTE0NDQ0MTQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAIDBQYHAQj/xABEEAACAQICBgYGBwUHBQAAAAABAgADEQQhBQYSMUFRIjJhcYGRBxNCUqGxFCNygpLB8DNic7LhFWOiwsPR0kNEU1SU/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAEDBAUC/8QAJBEBAQACAQUAAgIDAAAAAAAAAAECEQMEEiExURNBYfAiI0L/2gAMAwEAAhEDEQA/AOzREQEREDyImo6xa8UcMzUqY9dXXeFPQpnk78/3Rc87SLZPNTJbdRt0i4zSFGiNqrVp0151KioPNiJyHSGtWMxBN6pRD7FDojxcdI+YmKSmu0XsC53sc2PexzMpvNJ6i/Hp7fddefW/Aj/uFb+GruPNARLDa7YPg1Q91Cp+YE5mkvAyu8+XxbOmx+10dNdcGd7OvfQqeeSmXqeuGAP/AHCL/FDUx5uBOYu0juZE6jL4m9Lj9rtmFxlOqu1TdHX3qbqw8wZJnz+Og+2hKONz0yUcfeWxm0aC19r0CExF61LIbVgKidvJ+7Iy3Hmxvvwpz6fKeZ5dZiQtHY+niKa1aTBkfcV7MiDyIORB3SbL2ciIgIiICIiAiIgIiICIiAiIgIiICIiBp3pL00+DwQank9WqlK/IFXdvMIR4zmFHWtuilShRdCBkE2SB2EToPpjoFtHI43UsRTc9xV6fzcTjFN817LCZ+bKytfBjLG6U6FLFKamF2ttevQbrr2p76939JdfApQUPiXFO+5B0qjfdG79bpp2ExL0yaiMUdSLMpsRe8V6zVPrHYs7E3ZjcnxlFynxfMb98Nkq6fpIbUqN/3qrXJ8Bulk6eqk2sgH8MTAu+Y7hPRUzvK7lVuMxZkaYc9ZUPctvlH9oowzup5HMHuImGDyktPMterIzH0hG3MP13y25mJJlVPElcjmJ7leLG2aoaxnAV7sT9HqkCqt8l4CoBwI48x3CdvRwwBBuCAQRxB3GfNjPcdhnYvRfpU18D6tjd8Kxp57ytgyHyOz9wzXw5fqsXPh/1G6xES9mIiICIiAiIgIiICIiAiIgIiICIiBr2u9BKmj8Qj9Vkytv2rgpbt2rTjOO1TZF26T7ZAzRgAT9kjI906/r5Vth6af8Alr01/AGq/wCnNUWYep5LMpI6HSYS4W365UGsCDv7eFpVt5d03XTGrK139YrbDEdIbG0HPA7xY/PKV6I1Xp0m23b1jjq3Wyr27Nzc9plffjpd2XbX9GaArVwG6iH2nBufsrvPwmdo6rUV6zO57W2R4bNpsZlDSq51bMJGvYjVqiR0CyHsct8GvNd0joypQzNmT31FrfaHCb5WbhIlVAwKkXBFiDuInn8ll8vfZLHPS0oJkrSmF9TUZPZ3rfkf9t0hEzRPPlmyurqpOHqbx5TonodxNsTiKfCpTVvFGI+VQzmSPZhN59FNS2klF+tTqjvsAfyl3H4yjPy+ca7lERNbEREQEREBERAREQEREBERAREQEREDS9fKn1mFp/x6n4FVP9SYATM67tfFUB7tKsfxPT/4fKYUGczqL/srrdNNcU/v7XAZ6DKLylqgHGUNGl0mWqlS3fLT177paLTzcnqYvGMoYz1jLbmeXprWtqD6t+N2X5EfnNaJmza2n6tPtn+WYPA6Mq1s1Fl95jYHu5zZxX/CWsXNLc7Ih7Wc3r0UC+k0PKnW/lAmmY7AvRYK4tfcRmD3Gb76GaG1jar8KdE+bOo+QM0YebNM3JuY3btsRE1MZERAREQEREBERAREQEREBERAREQOea+1CMXTtwo/Nzf+UTACu3OZ/wBIotiMOfep1QPutTv/ADCaurzk9Tv8ldrpdfin9/aVtk8Y2pYDyoPM7Qu7U8LS3tykvArZpadp4zy2zSdG2O0xgjWNNcthWJfPO2W4eckiygBcgMgBwlbtLDGe93UjxqS2o2sah8OGO9SCP15+c3X0J4Arh8RiCP2tRUX7NNbkjs2nI+7NF00WqGlhKY2qlRlUAcyRbd2/IzuuruilweFo4Zd1JACfeY5s3ixJ8Zv6bG63XN6vKeoykRE1sRERAREQEREBERAREQEREBERAREQND9JlHLDVfdapT/Gof8A0ppCvOna+YQ1MDUIF2pFag+4btb7u0PGcqV5zeqx1nv66vRZb49fEoPKtuRg892pl017SNueF5Z25SXjRtdZ5bZ5QXlDPGjb1mkfE4paamo3Dd2nhLl7zY9QdA0cXXerWAZMNsbKE5F2udphxsFy7SeUu4sO7KRTy59mFyTfRjqq4b+0cStqlQfUowN6ane7A7iRkBwGfHLp0T2dTHGYzUcfLK5XdIiJ6eSIiAiIgIiICIiAiIgIiICIiAiIgWq1MMrKdzAg9xFjOGaRwjYetUoNvpsV713qfFSJ3ec+9JuhrquNQdKnZaoHFCei3epNu5jymfqMO7Hc/TV0vJ2Z6vqtCDyrakYPPdqc3TqbSNqeF5Y2p4XjRtdLygtLe1LhIpjabrcBy75MiLXmJfYT94/oCZ30caZXDYiqr3K1kW9s+kj77diux7lmqly7Fju4f7zaNRtHF6j1iOjTGyO1m3/D5iaOGXvmmfqLJx3bsyMGAINwRcEbiDLk0TRutdDC4n6FVeyEXVz1aLE/s3bhfeOW47xN4VgRcZg8uM6LlK4iICIiAiIgIiICIiAiIgIiICIiAiIgJYxWHWpTam4urqVYcwRYy/Ofa4a4PTqfRsKwBT9rVsG2TwpoDltcSxvbIb72Dn2l8C2FxFTDtvptYH3lOaMO8W+Mh7cnaSpvVLVmdnqAdJnYksBwueV8pjbqDZrqRvBFiPCc3l4rjl/DrcPLM8f5XNuVohbd5y0KyDcCxnrVHfLqryG+V9q7a+9ZaeQ6T/KQn2nN28uUvLStL1KgWIABJJAAAzJ5CN/DWvNe4HBvUdKaC7uQABN+03i00XhEw9KzYlxlyT36j9g3AcTbhcivROATRWGbG4gXrMAqIOtduqi/vHieAB7ZoekMU9eo9aob1KhubblHBV/dG6b+Di7Zu+65nU83flqeoxtUE3JJJYkktmWJ3kzYNWNdsRgCEa9bDcUZukg/u2O77Jy7pgnEjuJoZn0PoPTVDG0vW0G2lvZgcmRrA7LrwNiJk586aBxtfDVmahVamxRGyzR94s6HI7p0zQHpERyKWMUUam4VEuaL+eaHsNx2yBv8S3TcMAVIKnMFTcHuIlyAiIgIiICIiAiIgIiICIiAkXHYynQptUqMERBcsxy/qZdrVVRWZiAqAlidygC5J8JxjWXWBsfW2rkUEJ9Uh3ctth7x7dw7zAma06718UxoYctRoHrMMqjjtPsA8FGfMjcdeoqAABuEx1QvRJa22hJJI6w7+cl4PFJUF0N+fMd8lDK0Ke0pHvvTTza5+Am6a56BWpg1cACpRAa+Q2hbpAn9bpqOCZVFBmNlNck9yoT85ndYdI1cRURGUphSCUUmxqEGxLd2WXbK+SyY3azj33TTQUpS8tObM+g6TC4ZlPZYyBW0YEOTk27BObrddScsk9PNE6v1sSRsLZOLtko8ePhOiaC1cw+CU1XIZ0Us1R8ggAuSo9kWvnvlOrmklrUVYW2l6LBdwYZGw5HfNf15036xvoaH6tCDWI9s71TuGRPPIc5v4+HHHzPf1g5ufPPxfE+MHrPpxsbW9ZmKNO4pKeXFyPeb4C3bMHUkhzI7mXsyM8jPJn05xUCLTpAEZM6k3I4WHGSDja49qmv2KX/ImEomHc03pPbrI4IYXB2XO8HvmSaglZSUOzUG9GNwe1Sc7d8xeJru7KzvtFAQvQRQL2v1QOQ3yP8ASGVgymxHGQMvonWbF6NfZpt9WD0qNW5Rh+7xU9q+R3Truqmt9DSK2Q7FZR0qTkbQ7VPtL2j4TkewuKp+sYWA89rs7JrztUoVA6MyVEO0jobEEbiD+UJfUcTVNQ9aRpDDXawxFKy1VHE8HA5N87ibXCCIiAiIgIiICIiAiIgaL6UdJGnhVwymxxLWex/6aWZh3MdlTzBacxVul4TY/SPjfWaQZL3FGmidxN2b5iasW6SyRbQioW2rkBiNkk7I+7uPjJtOwyAsOwTG4c2qVF7Q3mLflJqNA2XQ2HWpUwisLjbqtnzBAB+M3LWzCXpJUA/ZMNw3K3RPhu8pqGrD/XYXvrD4gzbdZMdtn6Kh3gGqRwBzCd5yJ7Lc5Xy2TG7e+OXummstcbjI1PB1MTUWinWfeeCLxY9kv4jAIN1x3GbXqHTQUqlh09shmO8iwKi/LMzFxYzLLTVyZXHHbFaawo0VSRqFi1QGmdo9d7XFQjkMyQOAmkjIZkkm5LNvYnMsTzJzmZ1s0x9LxTMpvRo7SU7bmsbO453IsDyHbMGzToSammK3alzI7mXHaVJhugalQ7FMcT7XdJEF6e2CP0JZp4gtcE3K5bQ3NPcTiDV6KApRH4n7+yeBQosN0ClzKMNhzWqbA6ozY9koxNSwtxMytRPouGC/9Wrm3MdngMu8yErSY4LU9Wv7Pq5br8D+Uo0nS21PMZiYhzMsau2itzGffxgNSdOnAY2nWufVuQlUc0Y2JtzU2bwI4z6RVgRcZg5i3GfKeISzEc/znf8A0ZaY+laOp7RvUoE0nzueiBsk96kQVuETyIQ9iIgIiICIiAiJQ5sCeQMDgGsOJ9ZjMS/OtUH4G9X/AJJjajZrKFr7ZNT/AMhZ/wAZLfnPHO6SKax2awPB1I8Rn+UlI8iY8dEON6G8rR7584GcwGkWohKi5tTqZX/fXZHhebVhXsCzG71CWYneScyTOf8ArOgw7AR3qbibXhMXt00bmBMnUy+Gng15T8TUkWlp44ejiaKMRVr7IQjegNw7g8CFOXaRLb1LzW6lYPUepwPRXuGV/E/C08cGN7tvfPZMdLq2UBQLAAAAbgBkBPGeWi8mtVTCIKjjarN+zp9vvNyE3MapqaYemK2I3nqUx1qh7uXymIxdZ8S4qVMlXqIOqn9e2UuzVHNWqdqo3kg5KOE9ZoHjGWmaes0jYl8rc4EnQ1H1lcMeqnSPhuHnPNLYr1lRm9kdFe4f1lzAP6ug7+1Uvbu3D85i3aQlS5kvAvdCvI/OQXMv4Bukw5j5QlTjBmDOhehPSGzicRhicqlNaijtRgreJDr+Gc/xYymb9HGK9XpTDHhUNSme0PTe3+IL5Qh9GRLCVJeDQh7ERA9iIgIiICQtLVCmHrMN606jZdikybIukMN66jUpElRVR0uN67albjtF4HzTh8kUclUfCXryTpnQ9bA1TQrLZh1WUHYqLwZD+XCQlaEr7jaBHOQsM5F0O9Tbw4SSGkTF9Fw/A5GEJavMxoPE/Vmmd9MkeG8fAia+HkvRtbZqDk4t4jdK+bHuxW8WWsmb0pitlNkHpP0R2DifKYkNYWG4SjF4jbqMfZXor4dY+fylo1AMzuG+OLHtxRy5d2SeldaK+tcXb2E95uHhIa7TuatQ3qN5KOAEjo5qN6xtwyReQkgvLVapmlDNKGaUM0ges0h12ubS+zSKDnCU3E1OiqDcBITtKneWWMDwmXsGemO2/wApYl3Dddf1wMJSMVuMvatVfV43DP7teifDbF/hLNeW9Hvs1qR5Oh/xCEPpZKkkJUmKSpJCVIQyivLkx6VJISpAkT2eAz2AiIgIiIGH1i0DQx9E0ay9qOMmpNwZT+W47jOIaz6sYjRz2qDapMbJVUdF+Qb3W7PKfQ8j4vDJVRqdRVdHBDKwBBB5gwPmYNFVdpSOc6NrR6MWQtVwR2kzJo1Dmv2G4jsPnOdYim9NzTdWSou9XBDDwPDthKDTcjI7xlLm2crGxvkeUoxK57Q8ZbRuMCarWylpj6xtn2Rv7Zaapy3ndJFFdkW84Ei88LS0XnhaBcLS2zSgvKS0D2o2UsKYdpQDAqZpTEQklzD9de+W5dw3XX9cDAkV5awK3q0xzdP5hKsRUG4Zydqzo562JplVJp03Rna2ShTtEX55Wt2wh21KkkJUmPw6M24TNYPRxOZhCqgC0yVGlbfKqVEKJegIiICIiAiIgIiICYjTeruGxq7OIpK9uq2aunarrZh5zLxA4/p30U1F2mwtQOvBK1gw7A4Fj5Cc60pobEYU7OIpPTt7TL0T3MOj4XvPqWWqtFWBVlDA7wwBB8DA+VKIz2vKX9qd70n6PNHVyW9SKbn2qDFPHZHRPiJq2O9EQzNHEkchVQH4rb5QlywvKS83PGejDHp1PV1AOTlSfAiYbEal6Rp78M5HNSh/zXgYMvKC0yNTQGLXfhq3hSc/ISx/ZOJ/9bEf/NV/4wITQJkU0Jim3Yav40HHzElUtVcc+7DVPEKPmYGFibZhfR9jqm9FQfvPn5ATOYH0VVWzqVbdlNPzMDm8lYDR9WsbUkZu0DIfe3Ts2jPRjhadi6bZ/vDtD8PV+E23CaDpUwAFAA4AQbch0J6PHchq5JHuU7gHsZt/lbvnSNFatLTVVChUXcqiwE2dKCruEuwhEw+BRNwkoCexAREQEREBERAREQEREBERAREQEREDwy00RAsVN8oERA9EGIgXacvrEQK4iICIiAiIgIiICIiAiIgf/9k=" />
            <FaChevronDown /> 
       </div>
      </header>
      }
      </>
     }
     </>

    )
}

export default Header;