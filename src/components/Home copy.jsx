import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Container, Stack ,Flex, Heading, Text } from '@chakra-ui/react'
const fetchData = async() =>{
    try {
        const  { data } = await axios.get('https://gorest.co.in/public/v2/posts');
        return data;
    } catch (error) {

        throw Error('data not fetching');
        
    }
    
}
export const Home = () => {
    const { isPending, error, data  } = useQuery({queryKey: ['posts'],queryFn:fetchData})
    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message
  return (
    <Container maxW="1300px" mt="4">
        <Stack p="4" boxShadow="md" borderRadius="xl" border="1px solid #ccc">
            <Flex justify="space-between">
                <Text>
                    userId : 
                </Text>
                <Text>
                    PostId : 
                </Text>
            </Flex>
            <Heading fontSize="2xl">Title</Heading>
            <Text>Contant</Text>
        </Stack>
  </Container>
  )
}
