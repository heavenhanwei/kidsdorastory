import io,json,unittest
from unittest.mock import patch
import server
from cloud_config import protect
class CloudTests(unittest.TestCase):
    def test_cloud_response_and_request(self):
        config={'api_key':'test-key-not-a-credential','base_url':'https://dashscope.aliyuncs.com/compatible-mode/v1','model':'qwen3.8-flash'}
        raw=json.dumps({'choices':[{'message':{'content':json.dumps({'reply':'斑鸠用翅膀帮助自己飞起来。','intent':'ANSWER'},ensure_ascii=False)}}]}).encode()
        class Response(io.BytesIO):
            def __enter__(self):return self
            def __exit__(self,*args):self.close()
        class Opener:
            def open(self,request,timeout):
                assert request.full_url=='https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
                assert request.get_header('Authorization')=='Bearer '+config['api_key']
                body=json.loads(request.data)
                assert body['model']=='qwen3.8-flash' and body['enable_thinking'] is False
                assert body['response_format']['type']=='json_object'
                context=json.loads(body['messages'][-1]['content'])
                assert context['画面']['当前焦点描述'] and context['当前卡片']['观察邀请']
                assert context['已收集卡片'][0]['名称']=='桂花'
                assert '禁止空泛夸奖' in body['messages'][0]['content']
                return Response(raw)
        with patch.object(server,'cloud_settings',return_value=config),patch.object(server.urllib.request,'build_opener',return_value=Opener()):
            result=server.analyze({'text':'它为什么会飞？','item':'dove','turn':0,'scene':{'act':3},'cards':['flower']})
        self.assertEqual(result['reply'].count('？'),1);self.assertTrue(result['reply'].endswith('？'));self.assertEqual(result['source'],'cloud-model');self.assertEqual(result['intent'],'QUESTION');self.assertFalse(result['advance']);self.assertNotIn(config['api_key'],json.dumps(result))
    def test_no_config(self):
        with patch.object(server,'cloud_settings',return_value=None):r=server.analyze({'text':'dove','item':'dove','turn':0})
        self.assertEqual(r['source'],'local-demo');self.assertTrue(r['advance'])
    def test_invalid_input(self):
        with self.assertRaises(ValueError):server.analyze({'text':'x'*601,'item':'dove','turn':0})
    def test_encryption(self):
        raw=b'fake-credential-for-memory-test';cipher=protect(raw);self.assertEqual(protect(cipher,True),raw)
if __name__=='__main__':unittest.main()
