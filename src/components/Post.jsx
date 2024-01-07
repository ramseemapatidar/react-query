
import { useQuery,keepPreviousData } from "@tanstack/react-query"
import axios from "axios"
import { Container, Stack ,Flex, Heading, Text, Grid, Spinner,Button } from '@chakra-ui/react'
import { useNavigate, useParams } from "react-router-dom"

const fetchPost = async(id) =>{
    try {
        
        const  { data } = await axios.get(`https://gorest.co.in/public/v2/posts/${id}`);
        //console.log(data);
        return data;
    } catch (error) {

        throw Error('data not fetching');
        
    }
    
}
export const Post = () => {
    const { id } = useParams();
   // const pageId = parseInt(id);
    const navigate = useNavigate();


    const { isPending, error, data  } = useQuery({queryKey: ['post',id],queryFn:() =>fetchPost(id) })
    
    //if (isPending) return 'Loading...'

    //if (error) return 'An error has occurred: ' + error.message
    console.log(isPending,data);
  return (
    <Container maxW="1300px" mt="4">
        
        {isPending ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) : (
        <>
        <Flex justify="space-between" mb="4">
           
            </Flex>
            <Stack p="4" boxShadow="md" borderRadius="xl" border="1px solid #ccc" key={data.id}>
            <Flex justify="space-between">
                <Text>
                    userId : {data.user_id}
                </Text>
                <Text>
                    postId : {data.id}
                </Text>
            </Flex>
            <Heading fontSize="2xl">Title</Heading>
            <Text>{data.title}</Text>
        </Stack>
        </>
        )}
  </Container>
  )
}
