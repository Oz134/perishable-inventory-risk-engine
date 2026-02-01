import React from "react";
import { translations } from "./translations";

function Dashboard({ products, lang }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>{translations[lang].dashboardTitle}</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>{translations[lang].product}</th>
            <th>{translations[lang].quantity}</th>
            <th>{translations[lang].daysLeft}</th>
            <th>{translations[lang].risk}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>{p.daysLeft}</td>
              <td
                style={{
                  color:
                    p.risk === "High"
                      ? "red"
                      : p.risk === "Medium"
                      ? "orange"
                      : "green",
                }}
              >
                {p.risk}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
