const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add imports at the top
const imports = `
import logo from './images/logo.jpeg';
import image1 from './images/image1.jpeg';
import image2 from './images/image2.jpeg';
import image3 from './images/image3.jpeg';
import image4 from './images/image4.jpeg';
import image5 from './images/image5.jpeg';
import image from './images/image.jpeg';
`;
code = code.replace(/import \{ motion, AnimatePresence.*?from 'motion\/react';/, `$&${imports}`);

// 2. Replace Logo component
code = code.replace(/const Logo = \(\{ className.*?\}\);/s, `const Logo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <img src={logo} className={className} alt="MAPS SOLUTIONS Logo" />
);`);

// 3. Replace text
code = code.replace(/MAPS GROUP/g, 'MAPS SOLUTIONS');
code = code.replace(/GROUP/g, 'SOLUTIONS');

// 4. Update Images
code = code.replace(/'input_file_1.png'/g, 'image1');
code = code.replace(/'input_file_2.png'/g, 'image2');
code = code.replace(/'input_file_3.png'/g, 'image3');
code = code.replace(/'input_file_4.png'/g, 'image4');
code = code.replace(/src="input_file_0.png"/g, 'src={image5}');
code = code.replace(/src="input_file_5.png"/g, 'src={image}');

// 5. Update Phone number
code = code.replace(/061 652 7539/g, '0616527539');

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated effectively.');
