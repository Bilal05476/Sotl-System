export const SidebarOptions = ({ optionName, href }) => {
  return (
    <a href={href} className="options">
      {optionName}
    </a>
  );
};

export const EndPoint = ({ endpoint, method }) => {
  return (
    <div className="endpoint">
      <span className="method">{method}</span>
      {endpoint}
    </div>
  );
};

export const Parameters = ({ params }) => {
  return (
    <div className="parameters">
      <table>
        <thead>
          <tr>
            <th>Parameter name</th>
            <th>Parameter Type</th>
            <th>Parameter Default</th>
            <th>Available Values</th>
          </tr>
        </thead>
        <tbody>
          {params.map((item) => (
            <tr>
              <td>
                {" "}
                {item.req && "*"}
                {item.name}
              </td>
              <td>{item.type}</td>
              <td>{item.def ? item.def : "--"}</td>
              <td>{item.avail ? item.avail : "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
