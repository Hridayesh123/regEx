import { error } from "console";
import fs from "fs";

export function sanitizeData(content) {
  content = content.replace(/(^|\D)(\+31[\s-]?|0)[1-9]([-\s]?[0-9]){8}\b/g, function (match) {    //number
   
    return "0".repeat(match.length);
  });
  //console.log(content ,"num");

  content = content.replace(/^NL(\d{2})([A-Z]{4})(\d{10})/g,function (match, p1, p2, p3) {     //bank
      
      const n1 = "x".repeat(p1.length);
      const n2 = "x".repeat(p2.length);
      const n3 = "x".repeat(p3.length);
      return "NL" + n1 + n2 + n3;
    }
  );
  //console.log(content ,"bank");

  content = content.replace(/\b\d{4}\s?[a-zA-Z]{2}\b/g, function (match) {      //postal
   
    return "x".repeat(match.length);
  });
  // console.log(content ,"postal");

  content = content.replace(/([^@\s]+)@([^@\s]+\.)+(com|org|net)(\.[a-zA-Z]{2})/g,function (match, p1, p2, p3, p4) {     //email
     
      p1 = "x".repeat(p1.length);
      return p1 + "@" + p2 + p3 + p4;
    }
  );

  //console.log(content ,"email");

  const data = fs.readFileSync("C:/Users/pc/Documents/cities.json");  //address

  const jsonData = JSON.parse(data.toString());
  //console.log(jsonData);
  
  const cities = jsonData.municipalities;
  //console.log(cities);

  const regEx = new RegExp("(" + cities.join("|") + ")", "gi");

  content = content.replace(regEx, function (match) {
    return "x".repeat(match.length);
  });

 console.log("content airaxa",content);
 return content;
}

sanitizeData(
  "number is +31 6 20 87 45 18 . address is Oegstgeest....Achtkarspelen............almelo. postal is 5042PY. email is hridayez3@gmail.org.np"
);
