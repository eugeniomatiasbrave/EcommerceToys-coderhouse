import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import config from "../config/config.js";

faker.locale = "es";
const PASSWORD = config.mocks.MOCKS || 'defaultPassword';
const role = faker.helpers.arrayElement(["user", "admin"])

export const generateUser = async () => {
	const password = await bcrypt.hash( PASSWORD, 10);
	return {
	  firstName: faker.person.firstName(),
	  lastName: faker.person.lastName(),
	  email: faker.internet.email(),
	  birthDate: faker.date.past(),
	  password: password,
	  cartId: [], 
	  role: role
	};
  };

export const generateProduct = () => {
	return {
	  title: faker.commerce.productName(),
	  description: faker.commerce.productDescription({ max: 45 }),
	  code: faker.internet.password(3, false),
	  price: faker.commerce.price({ min: 100, max: 3000, dec: 0 }) ,// 133,
	  category: faker.commerce.department(),
	  stock: faker.number.int(100),
	  status: faker.datatype.boolean(), 
	  slug: faker.helpers.slugify(faker.commerce.productName()),
	  thumbnails: []
  }
}
