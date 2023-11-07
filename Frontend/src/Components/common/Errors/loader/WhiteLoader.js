export const WhiteLoader = (props) => {
    return (
       <div
          className='spinner-border '
          style={{
             width: "15px",
             color: `${props.color ? props.color :"white"}`,
             height: "15px",
             border: "2px solid",
             borderRight: "2px solid transparent",
          }}
          role='status'></div>
    )
 }